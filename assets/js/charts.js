// =====================================
// 📊 SISTEMA DE GRÁFICOS CHART.JS
// MC Consultoria - Sistema de Licitações
// =====================================

const Charts = {
    instances: {
        modalidade: null,
        tipologia: null
    },
    initialized: false,
    
    // Inicializar gráficos
    init() {
        Performance.start('Charts Initialization');
        Debug.log('📊 Inicializando sistema de gráficos...', 'info');
        
        try {
            this.createModalidadeChart();
            this.createTipologiaChart();
            this.initialized = true;
            
            Performance.end('Charts Initialization');
            Debug.log('✅ Gráficos inicializados com sucesso', 'success');
            
        } catch (error) {
            Performance.end('Charts Initialization');
            Debug.error('Erro ao inicializar gráficos:', error.message);
        }
    },
    
    // Criar gráfico de modalidades
    createModalidadeChart() {
        const canvas = document.getElementById('modalidadeChart');
        if (!canvas) {
            Debug.warning('Canvas modalidadeChart não encontrado');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Destruir gráfico existente se houver
        if (this.instances.modalidade) {
            this.instances.modalidade.destroy();
        }
        
        this.instances.modalidade = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        '#667eea', '#764ba2', '#f093fb', '#f5576c',
                        '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
                        '#ffd89b', '#19547b', '#667eea', '#764ba2'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    hoverBorderWidth: 3
                }]
            },
            options: this.getChartOptions('Distribuição por Modalidade')
        });
        
        Debug.log('Gráfico de modalidades criado', 'success');
    },
    
    // Criar gráfico de tipologias
    createTipologiaChart() {
        const canvas = document.getElementById('tipologiaChart');
        if (!canvas) {
            Debug.warning('Canvas tipologiaChart não encontrado');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Destruir gráfico existente se houver
        if (this.instances.tipologia) {
            this.instances.tipologia.destroy();
        }
        
        this.instances.tipologia = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                        '#9966FF', '#FF9F40', '#E7E9ED', '#77DD77',
                        '#FFB347', '#87CEEB', '#DDA0DD', '#98FB98'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    hoverBorderWidth: 3
                }]
            },
            options: this.getChartOptions('Distribuição por Tipologia')
        });
        
        Debug.log('Gráfico de tipologias criado', 'success');
    },
    
    // Opções padrão dos gráficos
    getChartOptions(title) {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: false // O título já está no HTML
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            family: 'Inter',
                            size: 12
                        },
                        color: '#374151'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#667eea',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    titleFont: {
                        family: 'Inter',
                        size: 13,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: 'Inter',
                        size: 12
                    },
                    callbacks: {
                        label: (context) => {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = total > 0 ? ((context.parsed * 100) / total).toFixed(1) : '0.0';
                            const value = context.parsed.toLocaleString('pt-BR');
                            return `${context.label}: ${value} (${percentage}%)`;
                        },
                        afterLabel: (context) => {
                            // Adicionar informação adicional se disponível
                            const dataset = context.dataset;
                            if (dataset.additionalInfo && dataset.additionalInfo[context.dataIndex]) {
                                return `Valor: ${UI.formatCurrency(dataset.additionalInfo[context.dataIndex])}`;
                            }
                            return '';
                        }
                    }
                }
            },
            elements: {
                arc: {
                    borderWidth: 2,
                    hoverBorderWidth: 3
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1000,
                easing: 'easeInOutQuart'
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        };
    },
    
    // Atualizar gráficos com novos dados
    update(distribution) {
        if (!this.initialized) {
            Debug.warning('Gráficos não inicializados, tentando inicializar...');
            this.init();
            return;
        }
        
        if (!distribution || typeof distribution !== 'object') {
            Debug.warning('Dados de distribuição inválidos ou ausentes', distribution);
            return;
        }
        
        Performance.start('Charts Update');
        Debug.log('📊 Atualizando gráficos com dados:', 'info', distribution);
        
        try {
            this.updateModalidadeChart(distribution.modalidade || {});
            this.updateTipologiaChart(distribution.tipologia || {});
            
            Performance.end('Charts Update');
            Debug.log('✅ Gráficos atualizados com sucesso', 'success');
            
        } catch (error) {
            Performance.end('Charts Update');
            Debug.error('Erro ao atualizar gráficos:', error.message);
        }
    },
    
    // Atualizar gráfico de modalidades
    updateModalidadeChart(modalidadeData) {
        if (!this.instances.modalidade || !modalidadeData) return;
        
        const entries = Object.entries(modalidadeData);
        if (entries.length === 0) {
            this.showEmptyChart(this.instances.modalidade, 'Nenhuma modalidade encontrada');
            return;
        }
        
        // Ordenar por valor decrescente
        entries.sort((a, b) => b[1] - a[1]);
        
        const labels = entries.map(([key]) => this.formatLabel(key));
        const data = entries.map(([, value]) => parseInt(value) || 0);
        
        this.instances.modalidade.data.labels = labels;
        this.instances.modalidade.data.datasets[0].data = data;
        
        // Atualizar com animação
        this.instances.modalidade.update('active');
        
        Debug.log('Gráfico de modalidades atualizado', 'info', { labels, data });
    },
    
    // Atualizar gráfico de tipologias
    updateTipologiaChart(tipologiaData) {
        if (!this.instances.tipologia || !tipologiaData) return;
        
        const entries = Object.entries(tipologiaData);
        if (entries.length === 0) {
            this.showEmptyChart(this.instances.tipologia, 'Nenhuma tipologia encontrada');
            return;
        }
        
        // Ordenar por valor decrescente
        entries.sort((a, b) => b[1] - a[1]);
        
        const labels = entries.map(([key]) => this.formatLabel(key));
        const data = entries.map(([, value]) => parseInt(value) || 0);
        
        this.instances.tipologia.data.labels = labels;
        this.instances.tipologia.data.datasets[0].data = data;
        
        // Atualizar com animação
        this.instances.tipologia.update('active');
        
        Debug.log('Gráfico de tipologias atualizado', 'info', { labels, data });
    },
    
    // Mostrar gráfico vazio
    showEmptyChart(chartInstance, message) {
        chartInstance.data.labels = [message];
        chartInstance.data.datasets[0].data = [1];
        chartInstance.data.datasets[0].backgroundColor = ['#e5e7eb'];
        chartInstance.update('none');
    },
    
    // Formatar labels para exibição
    formatLabel(label) {
        if (!label || typeof label !== 'string') return 'Não identificado';
        
        // Truncar labels muito longos
        const maxLength = 25;
        if (label.length > maxLength) {
            return label.substring(0, maxLength - 3) + '...';
        }
        
        return label;
    },
    
    // Redimensionar gráficos
    resize() {
        if (this.instances.modalidade) {
            this.instances.modalidade.resize();
        }
        if (this.instances.tipologia) {
            this.instances.tipologia.resize();
        }
        
        Debug.log('Gráficos redimensionados', 'info');
    },
    
    // Destruir gráficos
    destroy() {
        if (this.instances.modalidade) {
            this.instances.modalidade.destroy();
            this.instances.modalidade = null;
        }
        if (this.instances.tipologia) {
            this.instances.tipologia.destroy();
            this.instances.tipologia = null;
        }
        
        this.initialized = false;
        Debug.log('Gráficos destruídos', 'info');
    },
    
    // Exportar gráfico como imagem
    exportChart(chartType, filename) {
        const chart = this.instances[chartType];
        if (!chart) {
            Debug.warning(`Gráfico '${chartType}' não encontrado para exportação`);
            return;
        }
        
        try {
            const canvas = chart.canvas;
            const link = document.createElement('a');
            link.download = filename || `${chartType}-chart.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            Debug.log(`Gráfico ${chartType} exportado como ${filename}`, 'success');
            
        } catch (error) {
            Debug.error(`Erro ao exportar gráfico ${chartType}:`, error.message);
        }
    },
    
    // Obter dados do gráfico
    getChartData(chartType) {
        const chart = this.instances[chartType];
        if (!chart) return null;
        
        return {
            labels: chart.data.labels,
            data: chart.data.datasets[0].data,
            type: chart.config.type
        };
    },
    
    // Configurar responsividade
    setupResponsiveness() {
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.resize();
            }, 250);
        });
    },
    
    // Aplicar tema escuro/claro
    applyTheme(isDark = false) {
        const textColor = isDark ? '#f3f4f6' : '#374151';
        const backgroundColor = isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)';
        
        Object.values(this.instances).forEach(chart => {
            if (chart) {
                chart.options.plugins.legend.labels.color = textColor;
                chart.options.plugins.tooltip.backgroundColor = backgroundColor;
                chart.update('none');
            }
        });
        
        Debug.log(`Tema ${isDark ? 'escuro' : 'claro'} aplicado aos gráficos`, 'info');
    }
};

// Event listeners para responsividade
Charts.setupResponsiveness();

// Disponibilizar globalmente
window.Charts = Charts;

// Funções de conveniência
window.exportChart = (type, filename) => Charts.exportChart(type, filename);
window.getChartData = (type) => Charts.getChartData(type);

console.log('✅ CHARTS: Sistema de gráficos Chart.js carregado');
