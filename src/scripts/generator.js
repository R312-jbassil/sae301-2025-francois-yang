// Éléments DOM
const promptInput = document.getElementById('prompt-input');
const generateBtn = document.getElementById('generate-btn');
const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const errorMessage = document.getElementById('error-message');
const svgPreview = document.getElementById('svg-preview');
const svgCodeContainer = document.getElementById('svg-code-container');
const svgCodeTextarea = document.getElementById('svg-code');
const svgActions = document.getElementById('svg-actions');
const saveBtn = document.getElementById('save-btn');
const toggleCodeBtn = document.getElementById('toggle-code-btn');
const suggestionBtns = document.querySelectorAll('.suggestion-btn');

// Variable pour stocker le SVG généré
let currentSVG = '';
let currentPrompt = '';

// Gestion des suggestions rapides
suggestionBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		const suggestion = btn.dataset.suggestion;
		if (promptInput) {
			promptInput.value = suggestion;
		}
	});
});

// Fonction pour afficher l'état de chargement
function showLoading() {
	if (loadingState) loadingState.classList.remove('hidden');
	if (errorState) errorState.classList.add('hidden');
	if (generateBtn) generateBtn.disabled = true;
}

// Fonction pour masquer l'état de chargement
function hideLoading() {
	if (loadingState) loadingState.classList.add('hidden');
	if (generateBtn) generateBtn.disabled = false;
}

// Fonction pour afficher une erreur
function showError(message) {
	if (errorState) errorState.classList.remove('hidden');
	if (errorMessage) errorMessage.textContent = message;
	hideLoading();
}

// Fonction pour masquer l'erreur
function hideError() {
	if (errorState) errorState.classList.add('hidden');
}

// Fonction pour générer le SVG avec l'IA
async function generateGlasses() {
	const prompt = promptInput?.value.trim();
	
	if (!prompt) {
		showError('Veuillez décrire les lunettes que vous souhaitez générer.');
		return;
	}

	hideError();
	showLoading();

	// Stocker le prompt pour la sauvegarde
	currentPrompt = prompt;

	try {
		// Construire le message pour l'IA
		const messages = [
			{
				role: 'user',
				content: `Generate SVG code for eyeglasses with the following description: ${prompt}. 
				
				Requirements:
				- Create a complete SVG element with viewBox="0 0 200 100"
				- Include distinct IDs for different parts: id="frame", id="temples", id="lenses"
				- Use realistic proportions for eyeglasses
				- Include all SVG opening and closing tags
				- Use paths and shapes to create the glasses
				- Make it visually appealing
				
				Only return the SVG code, nothing else.`
			}
		];

		console.log('Envoi de la requête à l\'IA:', messages);

		// Appeler l'API
		const response = await fetch('/api/generateSVG', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(messages)
		});

		if (!response.ok) {
			throw new Error(`Erreur HTTP: ${response.status}`);
		}

		const data = await response.json();
		console.log('Réponse de l\'IA:', data);

		if (data.error) {
			throw new Error(data.error);
		}

		if (!data.svg || data.svg.trim() === '') {
			throw new Error('L\'IA n\'a pas généré de SVG valide. Essayez une description différente.');
		}

		// Stocker le SVG
		currentSVG = data.svg;

		// Afficher le SVG dans l'aperçu
		displaySVG(currentSVG);

		// Afficher les boutons d'action
		if (svgActions) {
			svgActions.classList.remove('hidden');
			svgActions.classList.add('flex');
		}

		hideLoading();

	} catch (error) {
		console.error('Erreur lors de la génération:', error);
		showError(`Erreur: ${error.message}`);
	}
}

// Fonction pour afficher le SVG
function displaySVG(svgCode) {
	if (!svgPreview) return;

	// Créer un conteneur pour le SVG
	svgPreview.innerHTML = `
		<div class="w-full h-full flex items-center justify-center">
			${svgCode}
		</div>
	`;

	// Mettre à jour le code dans la textarea
	if (svgCodeTextarea) {
		svgCodeTextarea.value = svgCode;
	}

	// Appliquer des styles au SVG pour qu'il s'adapte bien
	const svgElement = svgPreview.querySelector('svg');
	if (svgElement) {
		svgElement.style.maxWidth = '100%';
		svgElement.style.maxHeight = '400px';
		svgElement.style.width = 'auto';
		svgElement.style.height = 'auto';
	}
}

// Fonction pour basculer l'affichage du code
function toggleCode() {
	if (!svgCodeContainer) return;

	if (svgCodeContainer.classList.contains('hidden')) {
		svgCodeContainer.classList.remove('hidden');
		if (toggleCodeBtn) toggleCodeBtn.textContent = 'Masquer le code';
	} else {
		svgCodeContainer.classList.add('hidden');
		if (toggleCodeBtn) toggleCodeBtn.textContent = 'Afficher le code';
	}
}

// Fonction pour sauvegarder dans PocketBase
async function saveToCollection() {
	if (!currentSVG) {
		showError('Aucun SVG à sauvegarder. Générez d\'abord des lunettes.');
		return;
	}

	if (!currentPrompt) {
		showError('Aucun prompt trouvé.');
		return;
	}

	// Demander un nom pour la création
	const nomCreation = prompt('Donnez un nom à cette création :', 'Lunettes générées par IA') || 'Sans nom';

	if (nomCreation === null) {
		return;
	}

	try {
		// 1. Enregistrer dans la collection configuration_ia
		const configData = {
			prompt: currentPrompt,
			reponse_svg: currentSVG
		};

		console.log('Sauvegarde configuration IA:', configData);

		const configResponse = await fetch('http://127.0.0.1:8090/api/collections/configuration_ia/records', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(configData)
		});

		if (!configResponse.ok) {
			const configError = await configResponse.json();
			console.error('Erreur lors de l\'enregistrement de la configuration IA:', configError);
			throw new Error('Impossible de sauvegarder la configuration IA');
		}

		const configResult = await configResponse.json();
		console.log('Configuration IA sauvegardée:', configResult);

		// 2. Enregistrer dans la collection lunettes
		const lunetteData = {
			nom_creation: nomCreation,
			code_svg: currentSVG,
			mode_creation: 'ia',
			forme: 'ia-generated',
			type_monture: 'ia-generated',
			type_verre: 'ia-generated',
			couleur_monture: '',
			couleur_branches: '',
			taille: 0
		};

		console.log('Sauvegarde dans lunettes:', lunetteData);

		const lunetteResponse = await fetch('http://127.0.0.1:8090/api/collections/lunettes/records', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(lunetteData)
		});

		if (lunetteResponse.ok) {
			const lunetteResult = await lunetteResponse.json();
			console.log('Lunettes sauvegardées:', lunetteResult);
			
			// Afficher un message de succès
			alert('✅ Lunettes et configuration IA sauvegardées avec succès !');
			
			// Rediriger vers la page collection
			setTimeout(() => {
				window.location.href = '/gallery/collection';
			}, 1000);
		} else {
			const error = await lunetteResponse.json();
			console.error('Erreur lors de l\'enregistrement des lunettes:', error);
			showError('Erreur lors de la sauvegarde des lunettes: ' + JSON.stringify(error, null, 2));
		}
	} catch (error) {
		console.error('Erreur réseau:', error);
		showError('Erreur de connexion. Assurez-vous que PocketBase est démarré sur le port 8090.');
	}
}

// Événements
if (generateBtn) {
	generateBtn.addEventListener('click', generateGlasses);
}

if (toggleCodeBtn) {
	toggleCodeBtn.addEventListener('click', toggleCode);
}

if (saveBtn) {
	saveBtn.addEventListener('click', saveToCollection);
}

// Permettre la génération avec la touche Entrée (Ctrl+Enter)
if (promptInput) {
	promptInput.addEventListener('keydown', (e) => {
		if (e.ctrlKey && e.key === 'Enter') {
			generateGlasses();
		}
	});
}
