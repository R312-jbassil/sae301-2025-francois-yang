// Récupérer les données existantes depuis la variable globale
let existingData = null;
let editingId = null;

const existingDataElement = document.getElementById('existing-lunette-data');
if (existingDataElement) {
	try {
		existingData = JSON.parse(existingDataElement.textContent || '{}');
		editingId = existingData.id;
		console.log('Mode édition - Données chargées:', existingData);
	} catch (e) {
		console.error('Erreur lors du chargement des données:', e);
	}
}

// État de la personnalisation
let currentStep = 1;
const totalSteps = 6;

const selections = {
	monture: existingData?.forme || 'aviateur',
	verres: existingData?.type_verre || '',
	materiauMonture: existingData?.type_monture || '',
	materiauBranches: existingData?.type_monture || '',
	couleurMonture: existingData?.couleur_monture || '',
	couleurBranches: existingData?.couleur_branches || '',
	pont: '',
	taille: existingData?.taille?.toString() || ''
};

// Éléments DOM
const btnSuivant = document.getElementById('btn-suivant');
const btnPrecedent = document.getElementById('btn-precedent');
const btnCommander = document.getElementById('btn-commander');
const stepNumber = document.getElementById('current-step');
const progressBar = document.getElementById('progress-bar');
const remainingSteps = document.getElementById('remaining-steps');

// Fonctions pour changer les couleurs du SVG
function updateMontureColor(color) {
	console.log('Changement couleur monture:', color);
	const montureGroup = document.getElementById('monture');
	if (montureGroup) {
		const paths = montureGroup.querySelectorAll('path.cls-4');
		console.log('Nombre de paths monture trouvés:', paths.length);
		paths.forEach(path => {
			path.style.fill = color;
		});
	}
}

function updateBranchesColor(color) {
	console.log('Changement couleur branches:', color);
	const branchesGroup = document.getElementById('branches');
	if (branchesGroup) {
		const paths = branchesGroup.querySelectorAll('path.cls-4');
		console.log('Nombre de paths branches trouvés:', paths.length);
		paths.forEach(path => {
			path.style.fill = color;
		});
	}
}

// Fonction pour pré-sélectionner les options si on est en mode édition
function initializeSelections() {
	if (!existingData) return;
	
	console.log('Initialisation des sélections avec:', selections);
	
	// Pré-sélectionner la monture
	if (selections.monture) {
		const montureCard = document.querySelector(`.option-card[data-step="1"][data-option="${selections.monture}"]`);
		if (montureCard) {
			montureCard.click();
		}
	}
	
	// Pré-sélectionner les verres
	if (selections.verres) {
		const verreCard = document.querySelector(`.option-card[data-step="2"][data-option="${selections.verres}"]`);
		if (verreCard) {
			verreCard.click();
		}
	}
	
	// Pré-sélectionner les couleurs
	if (selections.couleurMonture) {
		const couleurMontureOption = document.querySelector(`.color-option[data-category="monture"][data-color="${selections.couleurMonture}"]`);
		if (couleurMontureOption) {
			couleurMontureOption.click();
			// Mettre à jour la couleur du SVG
			setTimeout(() => updateMontureColor(selections.couleurMonture), 200);
		}
	}
	
	if (selections.couleurBranches) {
		const couleurBranchesOption = document.querySelector(`.color-option[data-category="branches"][data-color="${selections.couleurBranches}"]`);
		if (couleurBranchesOption) {
			couleurBranchesOption.click();
			// Mettre à jour la couleur du SVG
			setTimeout(() => updateBranchesColor(selections.couleurBranches), 200);
		}
	}
	
	// Pré-sélectionner la taille
	if (selections.taille) {
		const tailleCard = document.querySelector(`.taille-option[data-taille="${selections.taille}"]`);
		if (tailleCard) {
			tailleCard.click();
		}
	}
}

// Gestion de la sélection des options
const optionCards = document.querySelectorAll('.option-card');
const materialOptions = document.querySelectorAll('.material-option');

// Gestion des options normales (étapes 1, 2, 4, 5, 6)
optionCards.forEach(card => {
	card.addEventListener('click', (e) => {
		const target = e.currentTarget;
		const step = target.dataset.step;
		const option = target.dataset.option;
		
		if (!step || !option) return;

		// Retirer la classe active de toutes les cartes de cette étape
		document.querySelectorAll(`.option-card[data-step="${step}"]`).forEach(c => {
			c.classList.remove('active');
			const checkmark = c.querySelector('.checkmark');
			if (checkmark) checkmark.remove();
		});
		
		// Ajouter la classe active à la carte cliquée
		target.classList.add('active');
		
		// Ajouter l'icône check
		const checkIcon = document.createElement('div');
		checkIcon.className = 'checkmark absolute top-3 right-3';
		checkIcon.innerHTML = `
			<svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
				<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
			</svg>
		`;
		target.insertBefore(checkIcon, target.firstChild);
		
		// Mettre à jour les sélections
		const stepNames = {
			'1': 'monture',
			'2': 'verres',
			'5': 'pont',
			'6': 'taille'
		};
		const stepName = stepNames[step];
		if (stepName) {
			selections[stepName] = option;
		}
		
		// Mettre à jour le panneau de détails
		const detailElement = document.getElementById(`detail-${stepName}`);
		if (detailElement) {
			detailElement.textContent = option.charAt(0).toUpperCase() + option.slice(1).replace('-', ' ');
		}
	});
});

// Gestion spéciale pour les matériaux (étape 3)
materialOptions.forEach(option => {
	option.addEventListener('click', (e) => {
		const target = e.currentTarget;
		const step = target.dataset.step;
		const optionValue = target.dataset.option;
		const category = target.dataset.category;
		
		if (!step || !optionValue || !category) return;

		// Retirer la classe active uniquement des options de la même catégorie
		document.querySelectorAll(`.material-option[data-category="${category}"]`).forEach(opt => {
			opt.classList.remove('selected');
			const h4 = opt.querySelector('h4');
			if (h4) {
				const existingCheck = h4.querySelector('.check-icon');
				if (existingCheck) existingCheck.remove();
			}
		});

		// Ajouter la classe selected à l'option cliquée
		target.classList.add('selected');

		// Ajouter l'icône check à côté du titre
		const h4 = target.querySelector('h4');
		if (h4) {
			const checkIcon = document.createElement('span');
			checkIcon.className = 'check-icon inline-block ml-2';
			checkIcon.innerHTML = `
				<svg class="w-5 h-5 text-primary inline-block" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
				</svg>
			`;
			h4.appendChild(checkIcon);
		}

		// Mettre à jour les sélections
		if (category === 'monture') {
			selections.materiauMonture = optionValue;
		} else if (category === 'branches') {
			selections.materiauBranches = optionValue;
		}

		// Mettre à jour le panneau de détails
		const detailElement = document.getElementById(`detail-materiau-${category}`);
		if (detailElement) {
			detailElement.textContent = optionValue.charAt(0).toUpperCase() + optionValue.slice(1).replace('-', ' ');
		}
	});
});

// Gestion spéciale pour les couleurs (étape 4)
const colorOptions = document.querySelectorAll('.color-option');

colorOptions.forEach(option => {
	option.addEventListener('click', (e) => {
		const target = e.currentTarget;
		const step = target.dataset.step;
		const optionValue = target.dataset.option;
		const category = target.dataset.category;
		
		if (!step || !optionValue || !category) return;

		// Retirer la classe selected uniquement des couleurs de la même catégorie
		document.querySelectorAll(`.color-option[data-category="${category}"]`).forEach(opt => {
			opt.classList.remove('selected');
		});

		// Ajouter la classe selected à l'option cliquée
		target.classList.add('selected');

		// Mettre à jour les sélections
		if (category === 'monture') {
			selections.couleurMonture = optionValue;
			updateMontureColor(target.dataset.color || '#000000');
		} else if (category === 'branches') {
			selections.couleurBranches = optionValue;
			updateBranchesColor(target.dataset.color || '#000000');
		}

		// Mettre à jour le panneau de détails
		const detailElement = document.getElementById(`detail-couleur-${category}`);
		if (detailElement) {
			detailElement.textContent = optionValue.charAt(0).toUpperCase() + optionValue.slice(1).replace('-', ' ');
		}
	});
});

// Gestion spéciale pour le pont (étape 5)
const pontOptions = document.querySelectorAll('.pont-option');

pontOptions.forEach(option => {
	option.addEventListener('click', (e) => {
		const target = e.currentTarget;
		const step = target.dataset.step;
		const optionValue = target.dataset.option;
		
		if (!step || !optionValue) return;

		// Retirer la classe selected de toutes les options
		document.querySelectorAll('.pont-option').forEach(opt => {
			opt.classList.remove('selected');
		});

		// Ajouter la classe selected à l'option cliquée
		target.classList.add('selected');

		// Mettre à jour les sélections
		selections.pont = optionValue;

		// Mettre à jour le panneau de détails
		const detailElement = document.getElementById('detail-pont');
		if (detailElement) {
			detailElement.textContent = optionValue;
		}
	});
});

// Gestion spéciale pour la taille (étape 6)
const tailleOptions = document.querySelectorAll('.taille-option');

tailleOptions.forEach(option => {
	option.addEventListener('click', (e) => {
		const target = e.currentTarget;
		const step = target.dataset.step;
		const optionValue = target.dataset.option;
		
		if (!step || !optionValue) return;

		// Retirer la classe selected de toutes les options
		document.querySelectorAll('.taille-option').forEach(opt => {
			opt.classList.remove('selected');
		});

		// Ajouter la classe selected à l'option cliquée
		target.classList.add('selected');

		// Mettre à jour les sélections
		selections.taille = optionValue;

		// Mettre à jour le panneau de détails
		const detailElement = document.getElementById('detail-taille');
		if (detailElement) {
			detailElement.textContent = optionValue;
		}
	});
});

// Navigation entre les étapes
function updateStep(newStep) {
	if (newStep < 1 || newStep > totalSteps) return;

	// Masquer toutes les étapes
	document.querySelectorAll('.step-content').forEach(step => {
		step.classList.add('hidden');
	});

	// Afficher l'étape courante
	const currentStepElement = document.querySelector(`.step-content[data-step="${newStep}"]`);
	if (currentStepElement) {
		currentStepElement.classList.remove('hidden');
	}

	currentStep = newStep;

	// Mettre à jour le breadcrumb
	document.querySelectorAll('.breadcrumb-step').forEach((breadcrumb, index) => {
		if (index + 1 === newStep) {
			breadcrumb.classList.add('active');
		} else {
			breadcrumb.classList.remove('active');
		}
	});

	// Mettre à jour l'affichage
	if (stepNumber) {
		stepNumber.textContent = currentStep.toString();
	}

	if (progressBar) {
		const progress = (currentStep / totalSteps) * 100;
		progressBar.value = progress;
	}

	if (remainingSteps) {
		const remaining = totalSteps - currentStep;
		remainingSteps.textContent = remaining.toString();
	}

	// Gérer l'affichage des boutons
	if (btnPrecedent) {
		if (currentStep === 1) {
			btnPrecedent.classList.add('hidden');
		} else {
			btnPrecedent.classList.remove('hidden');
		}
	}

	if (btnSuivant) {
		if (currentStep === totalSteps) {
			btnSuivant.textContent = editingId ? 'Mettre à jour ma personnalisation' : 'Enregistrer ma personnalisation';
		} else {
			btnSuivant.textContent = 'Suivant';
		}
	}

	if (btnCommander) {
		btnCommander.classList.add('hidden');
	}

	// Scroll to top
	window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Événements des boutons
if (btnSuivant) {
	btnSuivant.addEventListener('click', async () => {
		if (currentStep === totalSteps) {
			console.log('Personnalisation complète:', selections);
			
			// Demander un nom pour la création (seulement si nouvelle création)
			let nomCreation = existingData?.nom_creation || '';
			if (!editingId) {
				nomCreation = prompt('Donnez un nom à votre création :', 'Ma lunette personnalisée') || 'Sans nom';
				
				if (nomCreation === null) {
					return;
				}
			}
			
			try {
				const data = {
					nom_creation: nomCreation || 'Sans nom',
					forme: selections.monture || '',
					type_monture: selections.materiauMonture || '',
					type_verre: selections.verres || '',
					couleur_monture: selections.couleurMonture || '',
					couleur_branches: selections.couleurBranches || '',
					taille: parseInt(selections.taille) || 0,
					mode_creation: 'personnalisation',
					code_svg: '',
				};

				console.log('Données à envoyer:', data);

				const url = editingId 
					? `http://127.0.0.1:8090/api/collections/lunettes/records/${editingId}`
					: 'http://127.0.0.1:8090/api/collections/lunettes/records';
				const method = editingId ? 'PATCH' : 'POST';

				console.log(`${editingId ? 'Mise à jour' : 'Création'} de la lunette...`);

				const response = await fetch(url, {
					method: method,
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data)
				});

				console.log('Réponse status:', response.status);

				if (response.ok) {
					const result = await response.json();
					console.log('Lunettes enregistrées:', result);
					window.location.href = '/gallery/collection';
				} else {
					const error = await response.json();
					console.error('Erreur lors de l\'enregistrement:', error);
					alert('Erreur lors de l\'enregistrement:\n' + JSON.stringify(error, null, 2));
				}
			} catch (error) {
				console.error('Erreur réseau:', error);
				alert('Erreur de connexion. Assurez-vous que PocketBase est démarré sur le port 8090.');
			}
		} else {
			updateStep(currentStep + 1);
		}
	});
}

if (btnPrecedent) {
	btnPrecedent.addEventListener('click', () => {
		updateStep(currentStep - 1);
	});
}

// Événements du breadcrumb
document.querySelectorAll('.breadcrumb-step').forEach(breadcrumb => {
	breadcrumb.addEventListener('click', () => {
		const step = parseInt(breadcrumb.getAttribute('data-breadcrumb') || '1');
		updateStep(step);
	});
});

if (btnCommander) {
	btnCommander.addEventListener('click', () => {
		console.log('Commande:', selections);
		alert('Votre personnalisation est prête !\n\n' + JSON.stringify(selections, null, 2));
	});
}

// Initialiser les sélections si on est en mode édition
setTimeout(() => {
	initializeSelections();
}, 100);
