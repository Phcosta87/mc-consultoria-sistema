<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>03-performance.js - Monitor de Performance MC Consultoria</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        * { font-family: 'Inter', sans-serif; }
        
        /* Performance Badges */
        .performance-badge {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: bold;
            z-index: 9998;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .performance-excellent { 
            background: linear-gradient(135deg, #4ade80, #22c55e); 
            color: #065f46; 
            border: 2px solid rgba(34, 197, 94, 0.3);
        }
        
        .performance-good { 
            background: linear-gradient(135deg, #60a5fa, #3b82f6); 
            color: #1e3a8a; 
            border: 2px solid rgba(59, 130, 246, 0.3);
        }
        
        .performance-medium { 
            background: linear-gradient(135deg, #fbbf24, #f59e0b); 
            color: #92400e; 
            border: 2px solid rgba(245, 158, 11, 0.3);
        }
        
        .performance-poor { 
            background: linear-gradient(135deg, #f87171, #ef4444); 
            color: #991b1b; 
            border: 2px solid rgba(239, 68, 68, 0.3);
        }
        
        /* Performance Panel */
        .performance-panel {
            position: fixed;
            top: 10px;
            left: 10px;
            width: 400px;
            max-height: 700px;
            background: rgba(15, 23, 42, 0.95);
            color: #e2e8f0;
            border-radius: 15px;
            border: 1px solid rgba(148, 163, 184, 0.2);
            overflow-y: auto;
            z-index: 9999;
            transition: all 0.3s ease;
            backdrop-filter: blur(20px);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }
        
        .performance-panel.hidden { 
            transform: translateX(-420px); 
            opacity: 0; 
        }
        
        .metric-card {
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(148, 163, 184, 0.1);
            border-radius: 10px;
            padding: 15px;
            margin: 10px 0;
            transition: all 0.3s ease;
        }
        
        .metric-card:hover {
            background: rgba(30, 41, 59, 0.9);
            border-color: rgba(148, 163, 184, 0.3);
            transform: translateY(-2px);
        }
        
        .metric-value {
            font-size: 24px;
            font-weight: bold;
            margin: 8px 0;
        }
        
        .metric-trend {
            font-size: 12px;
            padding: 2px 8px;
            border-radius: 20px;
            margin-left: 8px;
        }
        
        .trend-up {
            background: rgba(239, 68, 68, 0.2);
            color: #fca5a5;
        }
        
        .trend-down {
            background: rgba(34, 197, 94, 0.2);
            color: #86efac;
        }
        
        .trend-stable {
            background: rgba(59, 130, 246, 0.2);
            color: #93c5fd;
        }
        
        /* Performance Chart */
        .chart-container {
            height: 200px;
            margin: 15px 0;
            background: rgba(30, 41, 59, 0.5);
            border-radius: 10px;
            padding: 15px;
        }
        
        /* Optimization Alerts */
        .optimization-alert {
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(251, 191, 36, 0.1));
            border: 1px solid rgba(245, 158, 11, 0.3);
            border-radius: 8px;
            padding: 12px;
            margin: 8px 0;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }
        
        /* Network Status */
        .network-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
            animation: blink 1s infinite;
        }
        
        .network-excellent { background: #22c55e; }
        .network-good { background: #3b82f6; }
        .network-medium { background: #f59e0b; }
        .network-poor { background: #ef4444; }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0.3; }
        }
        
        /* Memory Usage Bar */
        .memory-bar {
            width: 100%;
            height: 8px;
            background: rgba(148, 163, 184, 0.2);
            border-radius: 4px;
            overflow: hidden;
            margin: 8px 0;
        }
        
        .memory-fill {
            height: 100%;
            border-radius: 4px;
            transition: all 0.5s ease;
        }
        
        .memory-low { background: linear-gradient(90deg, #22c55e, #4ade80); }
        .memory-medium { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
        .memory-high { background: linear-gradient(90deg, #ef4444, #f87171); }
        
        /* Toggle Button */
        .performance-toggle {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 10000;
            background: rgba(15, 23, 42, 0.9);
            color: #e2e8f0;
            border: 1px solid rgba(148, 163, 184, 0.3);
            padding: 10px 15px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 12px;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }
        
        .performance-toggle:hover {
            background: rgba(15, 23, 42, 1);
            border-color: rgba(148, 163, 184, 0.5);
            transform: translateY(-2px);
        }
    </style>
</head>
<body class="bg-gray-900 text-white min-h-screen">
    <!-- Performance Toggle Button -->
    <button class="performance-toggle" onclick="Performance.togglePanel()">
        📊 Performance Monitor
    </button>
    
    <!-- Performance Panel -->
    <div id="performancePanel" class="performance-panel hidden">
        <div class="p-4 border-b border-gray-700">
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-bold text-white">⚡ Performance Monitor</h3>
                <button onclick="Performance.togglePanel()" class="text-gray-400 hover:text-white">✕</button>
            </div>
            <p class="text-sm text-gray-400 mt-1">Monitoramento em tempo real do sistema</p>
        </div>
        
        <div class="p-4">
            <!-- Network Status -->
            <div class="metric-card">
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-400">Status da Rede</span>
                    <span id="networkQuality" class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Excelente</span>
                </div>
                <div class="flex items-center mt-2">
                    <span id="networkIndicator" class="network-indicator network-excellent"></span>
                    <span id="networkLatency" class="metric-value text-green-400">12ms</span>
                    <span id="networkTrend" class="metric-trend trend-down">↓ 3ms</span>
                </div>
                <div class="text-xs text-gray-500 mt-1">
                    Download: <span id="downloadSpeed">45.2 Mbps</span> | 
                    Upload: <span id="uploadSpeed">12.8 Mbps</span>
                </div>
            </div>
            
            <!-- Response Time -->
            <div class="metric-card">
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-400">Tempo de Resposta API</span>
                    <span id="responseQuality" class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Ótimo</span>
                </div>
                <div class="flex items-center mt-2">
                    <span id="responseTime" class="metric-value text-blue-400">245ms</span>
                    <span id="responseTrend" class="metric-trend trend-stable">→ 0ms</span>
                </div>
                <div class="text-xs text-gray-500 mt-1">
                    Última consulta: <span id="lastQueryTime">--</span>
                </div>
            </div>
            
            <!-- Memory Usage -->
            <div class="metric-card">
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-400">Uso de Memória</span>
                    <span id="memoryPercentage" class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">34%</span>
                </div>
                <div class="memory-bar">
                    <div id="memoryFill" class="memory-fill memory-low" style="width: 34%"></div>
                </div>
                <div class="text-xs text-gray-500 mt-1">
                    <span id="memoryUsed">2.1 GB</span> / <span id="memoryTotal">6.0 GB</span> disponível
                </div>
            </div>
            
            <!-- Queries per Minute -->
            <div class="metric-card">
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-400">Consultas/min</span>
                    <span id="qpmQuality" class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Normal</span>
                </div>
                <div class="flex items-center mt-2">
                    <span id="queriesPerMinute" class="metric-value text-yellow-400">8</span>
                    <span id="qpmTrend" class="metric-trend trend-up">↑ 2</span>
                </div>
                <div class="text-xs text-gray-500 mt-1">
                    Total hoje: <span id="totalQueries">1,247</span>
                </div>
            </div>
            
            <!-- Performance Chart -->
            <div class="metric-card">
                <span class="text-sm text-gray-400">Histórico de Performance</span>
                <div class="chart-container">
                    <canvas id="performanceChart" width="350" height="150"></canvas>
                </div>
            </div>
            
            <!-- Optimization Alerts -->
            <div id="optimizationAlerts" class="metric-card">
                <span class="text-sm text-gray-400 mb-3 block">💡 Sugestões de Otimização</span>
                <div class="optimization-alert">
                    <div class="text-sm font-medium text-yellow-300">Cache de Filtros</div>
                    <div class="text-xs text-gray-400 mt-1">Considere implementar cache para filtros utilizados frequentemente</div>
                </div>
            </div>
            
            <!-- Actions -->
            <div class="metric-card">
                <div class="flex space-x-2">
                    <button onclick="Performance.runBenchmark()" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors">
                        🧪 Benchmark
                    </button>
                    <button onclick="Performance.clearCache()" class="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded text-sm transition-colors">
                        🗑️ Limpar Cache
                    </button>
                    <button onclick="Performance.optimizeSystem()" class="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors">
                        ⚡ Otimizar
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Performance Badge -->
    <div id="performanceBadge" class="performance-badge performance-excellent" onclick="Performance.togglePanel()">
        ⚡ Performance: Excelente (245ms)
    </div>

    <!-- Demo Content -->
    <div class="container mx-auto p-8 pt-20">
        <div class="bg-gray-800 rounded-lg p-6 mb-6">
            <h1 class="text-2xl font-bold mb-4">🚀 Sistema de Performance - MC Consultoria</h1>
            <p class="text-gray-300 mb-4">
                Sistema avançado de monitoramento de performance com métricas visuais e otimização automática.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="bg-gray-700 p-4 rounded">
                    <h3 class="font-semibold mb-2">📊 Métricas em Tempo Real</h3>
                    <p class="text-sm text-gray-300">Monitoramento contínuo de latência, memória e network</p>
                </div>
                <div class="bg-gray-700 p-4 rounded">
                    <h3 class="font-semibold mb-2">💡 Otimização Inteligente</h3>
                    <p class="text-sm text-gray-300">Sugestões automáticas para melhorar performance</p>
                </div>
                <div class="bg-gray-700 p-4 rounded">
                    <h3 class="font-semibold mb-2">🎯 Alertas Proativos</h3>
                    <p class="text-sm text-gray-300">Notificações antes que problemas afetem usuários</p>
                </div>
            </div>
            
            <div class="bg-gray-700 p-4 rounded">
                <h3 class="font-semibold mb-3">🧪 Teste o Sistema</h3>
                <div class="flex space-x-3">
                    <button onclick="Performance.simulateLoad()" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors">
                        Simular Carga
                    </button>
                    <button onclick="Performance.simulateSlowQuery()" class="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded transition-colors">
                        Simular Query Lenta
                    </button>
                    <button onclick="Performance.simulateNetworkIssue()" class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors">
                        Simular Problema de Rede
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        // =====================================
        // ⚡ SISTEMA DE PERFORMANCE - MC CONSULTORIA
        // =====================================
        
        const Performance = {
            // Estado atual
            metrics: {
                networkLatency: 12,
                responseTime: 245,
                memoryUsage: 34,
                queriesPerMinute: 8,
                totalQueries: 1247,
                downloadSpeed: 45.2,
                uploadSpeed: 12.8,
                memoryUsed: 2.1,
                memoryTotal: 6.0
            },
            
            // Histórico para gráficos
            history: {
                responseTime: [180, 220, 245, 230, 195, 245, 210, 185, 240, 245],
                timestamps: []
            },
            
            // Estado do painel
            panelVisible: false,
            
            // Timers
            updateInterval: null,
            chartInstance: null,
            
            // =====================================
            // 🚀 INICIALIZAÇÃO
            // =====================================
            init() {
                console.log('🚀 Performance Monitor iniciado');
                this.initChart();
                this.startMonitoring();
                this.updateBadge();
                this.updatePanel();
            },
            
            // =====================================
            // 📊 INICIALIZAR GRÁFICO
            // =====================================
            initChart() {
                const ctx = document.getElementById('performanceChart');
                if (!ctx) return;
                
                // Gerar timestamps
                const now = new Date();
                this.history.timestamps = Array.from({length: 10}, (_, i) => {
                    const time = new Date(now.getTime() - (9-i) * 30000); // 30s intervals
                    return time.toLocaleTimeString();
                });
                
                this.chartInstance = new Chart(ctx.getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: this.history.timestamps,
                        datasets: [{
                            label: 'Tempo de Resposta (ms)',
                            data: this.history.responseTime,
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false }
                        },
                        scales: {
                            x: { 
                                display: false,
                                grid: { display: false }
                            },
                            y: { 
                                display: false,
                                grid: { display: false }
                            }
                        },
                        elements: {
                            point: { radius: 3 }
                        }
                    }
                });
            },
            
            // =====================================
            // 🔄 MONITORAMENTO CONTÍNUO
            // =====================================
            startMonitoring() {
                this.updateInterval = setInterval(() => {
                    this.updateMetrics();
                    this.updateBadge();
                    this.updatePanel();
                    this.updateChart();
                }, 5000);
                
                console.log('📊 Monitoramento contínuo iniciado');
            },
            
            stopMonitoring() {
                if (this.updateInterval) {
                    clearInterval(this.updateInterval);
                    this.updateInterval = null;
                }
                console.log('⏹️ Monitoramento interrompido');
            },
            
            // =====================================
            // 📈 ATUALIZAR MÉTRICAS
            // =====================================
            updateMetrics() {
                // Simular variações naturais
                this.metrics.networkLatency += (Math.random() - 0.5) * 4;
                this.metrics.responseTime += (Math.random() - 0.5) * 50;
                this.metrics.memoryUsage += (Math.random() - 0.5) * 2;
                this.metrics.queriesPerMinute += Math.floor((Math.random() - 0.5) * 3);
                
                // Manter limites realistas
                this.metrics.networkLatency = Math.max(5, Math.min(100, this.metrics.networkLatency));
                this.metrics.responseTime = Math.max(100, Math.min(2000, this.metrics.responseTime));
                this.metrics.memoryUsage = Math.max(10, Math.min(90, this.metrics.memoryUsage));
                this.metrics.queriesPerMinute = Math.max(0, Math.min(30, this.metrics.queriesPerMinute));
                
                // Atualizar histórico
                this.history.responseTime.push(Math.round(this.metrics.responseTime));
                this.history.responseTime.shift(); // Remove primeiro item
                
                const now = new Date();
                this.history.timestamps.push(now.toLocaleTimeString());
                this.history.timestamps.shift();
            },
            
            // =====================================
            // 🏷️ ATUALIZAR BADGE
            // =====================================
            updateBadge() {
                const badge = document.getElementById('performanceBadge');
                if (!badge) return;
                
                const responseTime = Math.round(this.metrics.responseTime);
                let className, text;
                
                if (responseTime < 300) {
                    className = 'performance-badge performance-excellent';
                    text = `⚡ Performance: Excelente (${responseTime}ms)`;
                } else if (responseTime < 800) {
                    className = 'performance-badge performance-good';
                    text = `✅ Performance: Boa (${responseTime}ms)`;
                } else if (responseTime < 1500) {
                    className = 'performance-badge performance-medium';
                    text = `⚠️ Performance: Média (${responseTime}ms)`;
                } else {
                    className = 'performance-badge performance-poor';
                    text = `🐌 Performance: Lenta (${responseTime}ms)`;
                }
                
                badge.className = className;
                badge.textContent = text;
            },
            
            // =====================================
            // 🔄 ATUALIZAR PAINEL
            // =====================================
            updatePanel() {
                // Network Status
                const latency = Math.round(this.metrics.networkLatency);
                document.getElementById('networkLatency').textContent = `${latency}ms`;
                
                const networkIndicator = document.getElementById('networkIndicator');
                const networkQuality = document.getElementById('networkQuality');
                
                if (latency < 20) {
                    networkIndicator.className = 'network-indicator network-excellent';
                    networkQuality.textContent = 'Excelente';
                    networkQuality.className = 'text-xs bg-green-100 text-green-800 px-2 py-1 rounded';
                } else if (latency < 50) {
                    networkIndicator.className = 'network-indicator network-good';
                    networkQuality.textContent = 'Boa';
                    networkQuality.className = 'text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded';
                } else if (latency < 100) {
                    networkIndicator.className = 'network-indicator network-medium';
                    networkQuality.textContent = 'Média';
                    networkQuality.className = 'text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded';
                } else {
                    networkIndicator.className = 'network-indicator network-poor';
                    networkQuality.textContent = 'Ruim';
                    networkQuality.className = 'text-xs bg-red-100 text-red-800 px-2 py-1 rounded';
                }
                
                // Response Time
                const responseTime = Math.round(this.metrics.responseTime);
                document.getElementById('responseTime').textContent = `${responseTime}ms`;
                
                const responseQuality = document.getElementById('responseQuality');
                if (responseTime < 300) {
                    responseQuality.textContent = 'Ótimo';
                    responseQuality.className = 'text-xs bg-green-100 text-green-800 px-2 py-1 rounded';
                } else if (responseTime < 800) {
                    responseQuality.textContent = 'Bom';
                    responseQuality.className = 'text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded';
                } else {
                    responseQuality.textContent = 'Lento';
                    responseQuality.className = 'text-xs bg-red-100 text-red-800 px-2 py-1 rounded';
                }
                
                // Memory Usage
                const memoryPerc = Math.round(this.metrics.memoryUsage);
                document.getElementById('memoryPercentage').textContent = `${memoryPerc}%`;
                
                const memoryFill = document.getElementById('memoryFill');
                memoryFill.style.width = `${memoryPerc}%`;
                
                if (memoryPerc < 50) {
                    memoryFill.className = 'memory-fill memory-low';
                } else if (memoryPerc < 80) {
                    memoryFill.className = 'memory-fill memory-medium';
                } else {
                    memoryFill.className = 'memory-fill memory-high';
                }
                
                // Queries per minute
                const qpm = Math.round(this.metrics.queriesPerMinute);
                document.getElementById('queriesPerMinute').textContent = qpm;
                
                // Update other fields
                document.getElementById('downloadSpeed').textContent = `${this.metrics.downloadSpeed.toFixed(1)} Mbps`;
                document.getElementById('uploadSpeed').textContent = `${this.metrics.uploadSpeed.toFixed(1)} Mbps`;
                document.getElementById('memoryUsed').textContent = `${this.metrics.memoryUsed.toFixed(1)} GB`;
                document.getElementById('totalQueries').textContent = this.metrics.totalQueries.toLocaleString();
                document.getElementById('lastQueryTime').textContent = new Date().toLocaleTimeString();
            },
            
            // =====================================
            // 📊 ATUALIZAR GRÁFICO
            // =====================================
            updateChart() {
                if (!this.chartInstance) return;
                
                this.chartInstance.data.labels = this.history.timestamps;
                this.chartInstance.data.datasets[0].data = this.history.responseTime;
                this.chartInstance.update('none'); // Sem animação para performance
            },
            
            // =====================================
            // 🎛️ CONTROLES DO PAINEL
            // =====================================
            togglePanel() {
                const panel = document.getElementById('performancePanel');
                if (!panel) return;
                
                this.panelVisible = !this.panelVisible;
                
                if (this.panelVisible) {
                    panel.classList.remove('hidden');
                } else {
                    panel.classList.add('hidden');
                }
            },
            
            // =====================================
            // 🧪 TESTES E SIMULAÇÕES
            // =====================================
            runBenchmark() {
                console.log('🧪 Executando benchmark...');
                
                const startTime = performance.now();
                
                // Simular operações pesadas
                for (let i = 0; i < 100000; i++) {
                    Math.random() * Math.random();
                }
                
                const duration = performance.now() - startTime;
                
                alert(`🧪 Benchmark Concluído!\n\nTempo de execução: ${duration.toFixed(2)}ms\nPerformance do navegador: ${duration < 10 ? 'Excelente' : duration < 50 ? 'Boa' : 'Média'}`);
            },
            
            clearCache() {
                console.log('🗑️ Limpando cache...');
                
                // Simular limpeza
                setTimeout(() => {
                    this.metrics.responseTime *= 0.8; // Melhora response time
                    this.metrics.memoryUsage *= 0.7; // Reduz uso de memória
                    alert('🗑️ Cache limpo com sucesso!\nPerformance otimizada.');
                }, 1000);
            },
            
            optimizeSystem() {
                console.log('⚡ Otimizando sistema...');
                
                // Simular otimização
                setTimeout(() => {
                    this.metrics.responseTime *= 0.6;
                    this.metrics.networkLatency *= 0.8;
                    this.metrics.memoryUsage *= 0.5;
                    alert('⚡ Sistema otimizado!\nMelhorias aplicadas em todas as métricas.');
                }, 1500);
            },
            
            simulateLoad() {
                console.log('📈 Simulando carga alta...');
                this.metrics.responseTime *= 1.5;
                this.metrics.memoryUsage += 20;
                this.metrics.queriesPerMinute += 10;
            },
            
            simulateSlowQuery() {
                console.log('🐌 Simulando query lenta...');
                this.metrics.responseTime += 800;
            },
            
            simulateNetworkIssue() {
                console.log('🌐 Simulando problema de rede...');
                this.metrics.networkLatency += 50;
                this.metrics.downloadSpeed *= 0.3;
                this.metrics.uploadSpeed *= 0.3;
            }
        };
        
        // =====================================
        // 🚀 INICIALIZAÇÃO AUTOMÁTICA
        // =====================================
        document.addEventListener('DOMContentLoaded', () => {
            Performance.init();
        });
        
        // Cleanup ao sair
        window.addEventListener('beforeunload', () => {
            Performance.stopMonitoring();
        });
        
        // Disponibilizar globalmente
        window.Performance = Performance;
    </script>
</body>
</html>
