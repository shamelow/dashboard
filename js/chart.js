// Données des ventes
const salesData = {
    product1: { // Correspond à "Formation 1"
        monthly: [120, 150, 180, 90, 200, 220, 250, 210, 300, 280, 320, 400], // Ventes mensuelles
        yearly: [1500, 1800, 2100] // Ventes annuelles (3 dernières années)
    },
    product2: { // Correspond à "Formation 2"
        monthly: [80, 100, 120, 110, 130, 140, 160, 150, 170, 180, 190, 200],
        yearly: [1000, 1200, 1400]
    },
    product3: { // Correspond à "Formation 3"
        monthly: [50, 60, 70, 65, 75, 80, 90, 85, 95, 100, 110, 120],
        yearly: [600, 700, 800]
    }
};

// Labels pour les axes
const monthlyLabels = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const yearlyLabels = ["2021", "2022", "2023"];

// Palette de couleurs prédéfinie
const colors = [
    'rgba(75, 192, 192, 1)', // Turquoise
    'rgba(153, 102, 255, 1)', // Violet
    'rgba(255, 159, 64, 1)', // Orange
];

// Configuration initiale du graphique
let myChart;
const ctx = document.getElementById('myChart').getContext('2d');
myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: monthlyLabels,
        datasets: []
    },
    options: {
        responsive: true, // Rendre le graphique responsive
        maintainAspectRatio: false, // Désactiver le maintien du ratio
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Nombre de ventes'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Période'
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Ventes par mois'
            }
        }
    }
});

// Fonction pour mettre à jour le graphique
function updateChart() {
    const selectedProduct = document.getElementById('productSelect').value;
    const selectedPeriod = document.getElementById('periodSelect').value;

    // Réinitialiser les datasets
    myChart.data.datasets = [];

    // Ajouter les données en fonction de la sélection
    if (selectedProduct === 'all') {
        // Afficher tous les produits
        Object.keys(salesData).forEach((product, index) => {
            myChart.data.datasets.push({
                label: product === 'product1' ? 'Formation 1' : product === 'product2' ? 'Formation 2' : 'Formation 3', // Afficher un libellé lisible
                data: salesData[product][selectedPeriod],
                borderColor: colors[index % colors.length], // Utiliser une couleur prédéfinie
                backgroundColor: colors[index % colors.length].replace(', 1)', ', 0.2)'), // Couleur de fond avec transparence
                fill: true,
                borderWidth: 2,
                pointRadius: 5,
                pointBackgroundColor: colors[index % colors.length],
                pointBorderColor: '#fff',
                pointHoverRadius: 7,
                shadowColor: 'rgba(0, 0, 0, 0.2)', // Couleur de l'ombre
                shadowBlur: 10, // Flou de l'ombre
                shadowOffsetX: 0, // Décalage horizontal de l'ombre
                shadowOffsetY: 5 // Décalage vertical de l'ombre
            });
        });
    } else {
        // Vérifier si la formation sélectionnée existe dans les données
        if (salesData[selectedProduct]) {
            const index = Object.keys(salesData).indexOf(selectedProduct);
            myChart.data.datasets.push({
                label: selectedProduct === 'product1' ? 'Formation 1' : selectedProduct === 'product2' ? 'Formation 2' : 'Formation 3', // Afficher un libellé lisible
                data: salesData[selectedProduct][selectedPeriod],
                borderColor: colors[index % colors.length], // Utiliser une couleur prédéfinie
                backgroundColor: colors[index % colors.length].replace(', 1)', ', 0.2)'), // Couleur de fond avec transparence
                fill: true,
                borderWidth: 2,
                pointRadius: 5,
                pointBackgroundColor: colors[index % colors.length],
                pointBorderColor: '#fff',
                pointHoverRadius: 7,
                shadowColor: 'rgba(0, 0, 0, 0.2)', // Couleur de l'ombre
                shadowBlur: 10, // Flou de l'ombre
                shadowOffsetX: 0, // Décalage horizontal de l'ombre
                shadowOffsetY: 5 // Décalage vertical de l'ombre
            });
        } else {
            alert("Données non disponibles pour cette formation.");
            return;
        }
    }

    // Mettre à jour les labels en fonction de la période
    myChart.data.labels = selectedPeriod === 'monthly' ? monthlyLabels : yearlyLabels;

    // Mettre à jour le titre du graphique
    myChart.options.plugins.title.text = `Ventes ${selectedPeriod === 'monthly' ? 'par mois' : 'par année'}`;

    // Mettre à jour le graphique
    myChart.update();
}

// Écouter les changements de sélection
document.getElementById('updateChart').addEventListener('click', updateChart);

// Initialiser le graphique avec les données par défaut
updateChart();