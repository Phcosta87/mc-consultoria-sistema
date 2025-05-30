<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>08-charts.js - Sistema de Gráficos MC Consultoria</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {
            --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --glass-bg: rgba(255, 255, 255, 0.95);
            --glass-border: rgba(255, 255, 255, 0.2);
        }
        
        * { font-family: 'Inter', sans-serif; }
        
        .gradient-bg { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            min-height: 100vh; 
        }
        
        .glass-card { 
            background: rgba(255, 255, 255, 0.95); 
            backdrop-filter: blur(20px); 
            border: 1px solid rgba(255, 255, 255, 0.2); 
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1); 
        }
        
        .chart-container { 
            height: 400px; 
            background: rgba(255, 255, 255, 0.9); 
            backdrop-filter: blur(20px); 
            border-radius: 16px; 
            padding: 20px; 
            position: relative;
        }
        
        .logo-text { 
            font-family: 'Poppins', sans-serif; 
            font-weight: 700; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            -webkit-background-clip: text; 
            -webkit-text-fill-color: transparent; 
            background-clip: text; 
        }
        
        .btn-primary { 
            background: var(--primary-gradient); 
            transition: all 0.3s ease; 
            transform: translateY(0);
        }
        
        .btn-primary:hover { 
            transform: translateY(-2px); 
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3); 
        }
        
        .stat-mini {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 15px;
            margin: 10px 0;
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .fade-in { animation: fadeIn 0.6s ease-in; }
        
        @keyframes fadeIn { 
            from { opacity: 0; transform: translateY(20px); } 
            to { opacity: 1; transform: translateY(0); } 
        }
    </style>
</head>
<body>
    <div class="gradient-bg">
        <div class="container mx-auto px-4 py-8">
            <!-- Header -->
            <div class="glass-card rounded-2xl p-6 mb-8 fade-in">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-2xl font-bold logo-text">MC Consultoria</h1>
                        <p class="text-gray-600">Sistema de Gráficos - Distribuição de Licitações</p>
                    </div>
                    <div class="flex space-x-4">
                        <button onclick="updateCharts()" class="btn-primary text-white px-4 py-2 rounded-lg">
                            🔄 Atualizar Dados
                        </button>
                        <button onclick="generateRandomData()" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                            🎲 Dados Aleatórios
                        </button>
                        <button onclick="exportCharts()" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                            📊 Exportar
                        </button>
                    </div>
                </div>
            </div>

            <!-- Chart Controls -->
            <div class="glass-card rounded-2xl p-6 mb-8 fade-in">
                <h2 class="text-xl font-semibold mb-4">Controles dos Gráficos</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Gráfico - Modalidades</label>
                        <select id="modalidadeChartType" onchange="changeChartType('modalidade')" class="w-full px-3 py-2 border border-gray-200 rounded-lg">
                            <option value="doughnut">Doughnut</option>
                            <option value="pie">Pizza</option>
                            <option value="bar">Barras</option>
                            <option value="line">Linha</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Gráfico - Tipologias</label>
                        <select id="tipologiaChartType" onchange="changeChartType('tipologia')" class="w-full px-3 py-2 border border-gray-200 rounded-lg">
                            <option value="doughnut">Doughnut</option>
                            <option value="pie">Pizza</option>
                            <option value="bar">Barras</option>
                            <option value="line">Linha</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Animação</label>
                        <select id="animationSpeed" onchange="updateAnimationSpeed()" class="w-full px-3 py-2 border border-gray-200 rounded-lg">
                            <option value="1000">Rápida (1s)</option>
                            <option value="2000" selected>Normal (2s)</option>
                            <option value="3000">Lenta (3s)</option>
                            <option value="0">Sem Animação</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Statistics Summary -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="stat-mini fade-in">
                    <h3 class="text-sm font-medium text-gray-600">Total de Modalidades</h3>
                    <p id="totalModalidades" class="text-2xl font-bold text-blue-600">0</p>
                </div>
                <div class="stat-mini fade-in">
                    <h3 class="text-sm font-medium text-gray-600">Total de Tipologias</h3>
                    <p id="totalTipologias" class="text-2xl font-bold text-green-600">0</p>
                </div>
                <div class="stat-mini fade-in">
                    <h3 class="text-sm font-medium text-gray-600">Modalidade Dominante</h3>
                    <p id="modalidadeDominante" class="text-lg font-bold text-purple-600">-</p>
                </div>
                <div class="stat-mini fade-in">
                    <h3 class="text-sm font-medium text-gray-600">Tipologia Dominante</h3>
                    <p id="tipologiaDominante" class="text-lg font-bold text-orange-600">-</p>
                </div>
            </div>

            <!-- Charts Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <!-- Modalidades Chart -->
                <div class="chart-container fade-in">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold">Distribuição por Modalidade</h3>
                        <div class="text-sm text-gray-500">
                            <span id="modalidadeTotal">0 itens</span>
                        </div>
                    </div>
                    <canvas id="modalidadeChart"></canvas>
                </div>

                <!-- Tipologias Chart -->
                <div class="chart-container fade-in">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold">Distribuição por Tipologia</h3>
                        <div class="text-sm text-gray-500">
                            <span id="tipologiaTotal">0 itens</span>
                        </div>
                    </div>
                    <canvas id="tipologiaChart"></canvas>
                </div>
            </div>

            <!-- Comparison Chart -->
            <div class="chart-container fade-in mb-8" style="height: 500px;">
                <h3 class="text-lg font-semibold mb-4">Comparação Modalidades vs Tipologias</h3>
                <canvas id="comparisonChart"></canvas>
            </div>

            <!-- Data Tables -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Modalidades Table -->
                <div class="glass-card rounded-2xl p-6 fade-in">
                    <h3 class="text-lg font-semibold mb-4">Dados - Modalidades</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="border-b">
                                    <th class="text-left py-2">Modalidade</th>
                                    <th class="text-right py-2">Quantidade</th>
                                    <th class="text-right py-2">%</th>
                                </tr>
                            </thead>
                            <tbody id="modalidadeTableBody">
                                <tr><td colspan="3" class="text-center py-4 text-gray-500">Nenhum dado disponível</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Tipologias Table -->
                <div class="glass-card rounded-2xl p-6 fade-in">
                    <h3 class="text-lg font-semibold mb-4">Dados - Tipologias</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="border-b">
                                    <th class="text-left py-2">Tipologia</th>
                                    <th class="text-right py-2">Quantidade</th>
                                    <th class="text-right py-2">%</th>
                                </tr>
                            </thead>
                            <tbody id="tipologiaTableBody">
                                <tr><td colspan="3" class="text-center py-4 text-gray-500">Nenhum dado disponível</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // =====================================
        // 📊 SISTEMA DE GRÁFICOS MC CONSULTORIA
        // =====================================
        
        const Charts = {
            instances: {
                modalidade: null,
                tipologia: null,
                comparison: null
            },
            
            colors: {
                modalidade: [
                    '#667eea', '#764ba2', '#f093fb', '#f5576c',
                    '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
                    '#667eea', '#764ba2'
                ],
                tipologia: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                    '#9966FF', '#FF9F40', '#E7E9ED', '#77DD77',
                    '#87CEEB', '#DDA0DD'
                ]
            },
            
            // Inicialização dos gráficos
            init() {
                console.log('🎨 Inicializando sistema de gráficos...');
                
                try {
                    this.createModalidadeChart();
                    this.createTipologiaChart();
                    this.createComparisonChart();
                    
                    // Carregar dados iniciais
                    this.loadSampleData();
                    
                    console.log('✅ Gráficos inicializados com sucesso');
                } catch (error) {
                    console.error('❌ Erro ao inicializar gráficos:', error);
                }
            },
            
            // Criar gráfico de modalidades
            createModalidadeChart() {
                const ctx = document.getElementById('modalidadeChart');
                if (!ctx) return;
                
                this.instances.modalidade = new Chart(ctx.getContext('2d'), {
                    type: 'doughnut',
                    data: {
                        labels: [],
                        datasets: [{
                            data: [],
                            backgroundColor: this.colors.modalidade,
                            borderWidth: 2,
                            borderColor: '#ffffff'
                        }]
                    },
                    options: this.getChartOptions('modalidade')
                });
            },
            
            // Criar gráfico de tipologias
            createTipologiaChart() {
                const ctx = document.getElementById('tipologiaChart');
                if (!ctx) return;
                
                this.instances.tipologia = new Chart(ctx.getContext('2d'), {
                    type: 'doughnut',
                    data: {
                        labels: [],
                        datasets: [{
                            data: [],
                            backgroundColor: this.colors.tipologia,
                            borderWidth: 2,
                            borderColor: '#ffffff'
                        }]
                    },
                    options: this.getChartOptions('tipologia')
                });
            },
            
            // Criar gráfico de comparação
            createComparisonChart() {
                const ctx = document.getElementById('comparisonChart');
                if (!ctx) return;
                
                this.instances.comparison = new Chart(ctx.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: [],
                        datasets: [
                            {
                                label: 'Modalidades',
                                data: [],
                                backgroundColor: '#667eea',
                                borderColor: '#667eea',
                                borderWidth: 1
                            },
                            {
                                label: 'Tipologias',
                                data: [],
                                backgroundColor: '#36A2EB',
                                borderColor: '#36A2EB',
                                borderWidth: 1
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                            tooltip: {
                                mode: 'index',
                                intersect: false,
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: { color: 'rgba(0,0,0,0.1)' }
                            },
                            x: {
                                grid: { color: 'rgba(0,0,0,0.1)' }
                            }
                        },
                        animation: { duration: 2000 }
                    }
                });
            },
            
            // Opções base para gráficos
            getChartOptions(type) {
                return {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { 
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                font: { size: 12 }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((context.parsed * 100) / total).toFixed(1);
                                    return `${context.label}: ${context.parsed} (${percentage}%)`;
                                }
                            }
                        }
                    },
                    animation: { duration: 2000 }
                };
            },
            
            // Atualizar dados dos gráficos
            update(distribution) {
                console.log('📊 Atualizando gráficos com dados:', distribution);
                
                if (!distribution) {
                    console.warn('⚠️ Nenhum dado de distribuição fornecido');
                    return;
                }
                
                try {
                    // Atualizar modalidades
                    if (distribution.modalidade && this.instances.modalidade) {
                        const modalidadeData = distribution.modalidade;
                        this.instances.modalidade.data.labels = Object.keys(modalidadeData);
                        this.instances.modalidade.data.datasets[0].data = Object.values(modalidadeData);
                        this.instances.modalidade.update();
                        
                        this.updateModalidadeStats(modalidadeData);
                        this.updateModalidadeTable(modalidadeData);
                    }
                    
                    // Atualizar tipologias
                    if (distribution.tipologia && this.instances.tipologia) {
                        const tipologiaData = distribution.tipologia;
                        this.instances.tipologia.data.labels = Object.keys(tipologiaData);
                        this.instances.tipologia.data.datasets[0].data = Object.values(tipologiaData);
                        this.instances.tipologia.update();
                        
                        this.updateTipologiaStats(tipologiaData);
                        this.updateTipologiaTable(tipologiaData);
                    }
                    
                    // Atualizar gráfico de comparação
                    this.updateComparisonChart(distribution);
                    
                    console.log('✅ Gráficos atualizados com sucesso');
                } catch (error) {
                    console.error('❌ Erro ao atualizar gráficos:', error);
                }
            },
            
            // Atualizar estatísticas de modalidades
            updateModalidadeStats(data) {
                const total = Object.values(data).reduce((a, b) => a + b, 0);
                const dominante = Object.keys(data).reduce((a, b) => data[a] > data[b] ? a : b);
                
                document.getElementById('totalModalidades').textContent = Object.keys(data).length;
                document.getElementById('modalidadeTotal').textContent = `${total} itens`;
                document.getElementById('modalidadeDominante').textContent = dominante;
            },
            
            // Atualizar estatísticas de tipologias
            updateTipologiaStats(data) {
                const total = Object.values(data).reduce((a, b) => a + b, 0);
                const dominante = Object.keys(data).reduce((a, b) => data[a] > data[b] ? a : b);
                
                document.getElementById('totalTipologias').textContent = Object.keys(data).length;
                document.getElementById('tipologiaTotal').textContent = `${total} itens`;
                document.getElementById('tipologiaDominante').textContent = dominante;
            },
            
            // Atualizar tabela de modalidades
            updateModalidadeTable(data) {
                const tbody = document.getElementById('modalidadeTableBody');
                const total = Object.values(data).reduce((a, b) => a + b, 0);
                
                tbody.innerHTML = '';
                
                Object.entries(data)
                    .sort(([,a], [,b]) => b - a)
                    .forEach(([key, value]) => {
                        const percentage = ((value * 100) / total).toFixed(1);
                        const row = `
                            <tr class="border-b border-gray-100">
                                <td class="py-2">${key}</td>
                                <td class="text-right py-2 font-medium">${value}</td>
                                <td class="text-right py-2 text-gray-600">${percentage}%</td>
                            </tr>
                        `;
                        tbody.innerHTML += row;
                    });
            },
            
            // Atualizar tabela de tipologias
            updateTipologiaTable(data) {
                const tbody = document.getElementById('tipologiaTableBody');
                const total = Object.values(data).reduce((a, b) => a + b, 0);
                
                tbody.innerHTML = '';
                
                Object.entries(data)
                    .sort(([,a], [,b]) => b - a)
                    .forEach(([key, value]) => {
                        const percentage = ((value * 100) / total).toFixed(1);
                        const row = `
                            <tr class="border-b border-gray-100">
                                <td class="py-2">${key}</td>
                                <td class="text-right py-2 font-medium">${value}</td>
                                <td class="text-right py-2 text-gray-600">${percentage}%</td>
                            </tr>
                        `;
                        tbody.innerHTML += row;
                    });
            },
            
            // Atualizar gráfico de comparação
            updateComparisonChart(distribution) {
                if (!this.instances.comparison) return;
                
                const modalidadeData = distribution.modalidade || {};
                const tipologiaData = distribution.tipologia || {};
                
                // Pegar top 5 de cada categoria
                const topModalidades = Object.entries(modalidadeData)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 5);
                
                const topTipologias = Object.entries(tipologiaData)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 5);
                
                const labels = [...new Set([
                    ...topModalidades.map(([key]) => key),
                    ...topTipologias.map(([key]) => key)
                ])];
                
                this.instances.comparison.data.labels = labels;
                this.instances.comparison.data.datasets[0].data = labels.map(label => modalidadeData[label] || 0);
                this.instances.comparison.data.datasets[1].data = labels.map(label => tipologiaData[label] || 0);
                this.instances.comparison.update();
            },
            
            // Carregar dados de exemplo
            loadSampleData() {
                const sampleData = {
                    modalidade: {
                        'Pregão Eletrônico': 1250,
                        'Concorrência Eletrônica': 340,
                        'Pregão Presencial': 180,
                        'Concorrência Presencial': 95,
                        'Leilão Eletrônico': 45,
                        'Concurso': 25
                    },
                    tipologia: {
                        'Obra/Construção': 560,
                        'Outros Serviços': 420,
                        'Aquisição': 380,
                        'Projetos/Serviços de Engenharia': 280,
                        'Manutenção': 240,
                        'Reforma Estrutural': 180,
                        'Pavimentação': 120,
                        'Não Classificado': 85
                    }
                };
                
                this.update(sampleData);
            },
            
            // Alterar tipo de gráfico
            changeType(chartName, newType) {
                const chart = this.instances[chartName];
                if (!chart) return;
                
                chart.config.type = newType;
                chart.update();
                
                console.log(`📊 Tipo de gráfico ${chartName} alterado para: ${newType}`);
            },
            
            // Exportar gráficos
            export() {
                Object.keys(this.instances).forEach(chartName => {
                    const chart = this.instances[chartName];
                    if (chart) {
                        const url = chart.toBase64Image();
                        const link = document.createElement('a');
                        link.download = `grafico-${chartName}.png`;
                        link.href = url;
                        link.click();
                    }
                });
                
                console.log('📥 Gráficos exportados');
            }
        };
        
        // =====================================
        // 🎮 FUNÇÕES GLOBAIS
        // =====================================
        
        // Inicialização
        document.addEventListener('DOMContentLoaded', function() {
            Charts.init();
        });
        
        // Atualizar gráficos
        function updateCharts() {
            Charts.loadSampleData();
        }
        
        // Gerar dados aleatórios
        function generateRandomData() {
            const modalidades = ['Pregão Eletrônico', 'Concorrência Eletrônica', 'Pregão Presencial', 'Concorrência Presencial', 'Leilão Eletrônico'];
            const tipologias = ['Obra/Construção', 'Outros Serviços', 'Aquisição', 'Projetos/Serviços de Engenharia', 'Manutenção', 'Reforma Estrutural'];
            
            const randomData = {
                modalidade: {},
                tipologia: {}
            };
            
            modalidades.forEach(mod => {
                randomData.modalidade[mod] = Math.floor(Math.random() * 1000) + 50;
            });
            
            tipologias.forEach(tip => {
                randomData.tipologia[tip] = Math.floor(Math.random() * 800) + 30;
            });
            
            Charts.update(randomData);
        }
        
        // Alterar tipo de gráfico
        function changeChartType(chartName) {
            const selectId = chartName + 'ChartType';
            const newType = document.getElementById(selectId).value;
            Charts.changeType(chartName, newType);
        }
        
        // Atualizar velocidade de animação
        function updateAnimationSpeed() {
            const speed = parseInt(document.getElementById('animationSpeed').value);
            
            Object.values(Charts.instances).forEach(chart => {
                if (chart && chart.options.animation) {
                    chart.options.animation.duration = speed;
                }
            });
            
            console.log(`⚡ Velocidade de animação alterada para: ${speed}ms`);
        }
        
        // Exportar gráficos
        function exportCharts() {
            Charts.export();
        }
        
        // Expor para uso global
        window.Charts = Charts;
    </script>
</body>
</html>
