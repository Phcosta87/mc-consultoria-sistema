<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>02-debug.js - Sistema de Debug MC Consultoria</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
    <style>
        body {
            background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #7c2d12 100%);
            font-family: 'Courier New', monospace;
        }
        
        .debug-container {
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid #333;
        }
        
        .debug-log {
            margin: 5px 0;
            padding: 8px 12px;
            border-left: 4px solid #00ff00;
            background: rgba(0, 255, 0, 0.1);
            word-wrap: break-word;
            border-radius: 4px;
            font-size: 12px;
            line-height: 1.4;
        }
        
        .debug-error {
            border-left-color: #ff0000;
            background: rgba(255, 0, 0, 0.15);
            color: #ff6666;
        }
        
        .debug-warning {
            border-left-color: #ffaa00;
            background: rgba(255, 170, 0, 0.15);
            color: #ffcc66;
        }
        
        .debug-info {
            border-left-color: #0088ff;
            background: rgba(0, 136, 255, 0.15);
            color: #66ccff;
        }
        
        .debug-success {
            border-left-color: #00ff00;
            background: rgba(0, 255, 0, 0.2);
            color: #88ff88;
        }
        
        .debug-filter {
            border-left-color: #ff6b35;
            background: rgba(255, 107, 53, 0.15);
            color: #ff9f7a;
        }
        
        .performance-badge {
            transition: all 0.3s ease;
        }
        
        .performance-good { 
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
        }
        
        .performance-medium { 
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
        }
        
        .performance-bad { 
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
        }
        
        .filter-counter {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        
        .code-block {
            background: #1a1a1a;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 16px;
            overflow-x: auto;
            font-family: 'Courier New', monospace;
            color: #e5e5e5;
        }
        
        .metric-card {
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
        }
    </style>
</head>
<body class="min-h-screen text-white">
    <!-- Header -->
    <div class="bg-black bg-opacity-50 border-b border-gray-700">
        <div class="max-w-7xl mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <i class="fas fa-bug text-green-400 text-2xl"></i>
                    <h1 class="text-2xl font-bold">Sistema de Debug MC Consultoria</h1>
                    <span class="px-3 py-1 bg-green-500 text-black text-xs rounded-full font-bold">ATIVO</span>
                </div>
                <div class="flex items-center space-x-4">
                    <div id="systemTime" class="text-green-400 font-mono"></div>
                    <button onclick="toggleDebugMode()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                        <i class="fas fa-power-off"></i> Toggle Debug
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-8">
        <!-- Performance Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="metric-card p-6 rounded-xl">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-300">Tempo de Resposta</p>
                        <p id="responseTime" class="text-2xl font-bold text-green-400">0ms</p>
                    </div>
                    <i class="fas fa-tachometer-alt text-3xl text-green-400"></i>
                </div>
            </div>
            
            <div class="metric-card p-6 rounded-xl">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-300">Filtros Ativos</p>
                        <p id="activeFiltersCount" class="text-2xl font-bold text-blue-400">0</p>
                    </div>
                    <i class="fas fa-filter text-3xl text-blue-400"></i>
                </div>
            </div>
            
            <div class="metric-card p-6 rounded-xl">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-300">Memória JS</p>
                        <p id="memoryUsage" class="text-2xl font-bold text-yellow-400">0MB</p>
                    </div>
                    <i class="fas fa-memory text-3xl text-yellow-400"></i>
                </div>
            </div>
            
            <div class="metric-card p-6 rounded-xl">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-300">Total de Logs</p>
                        <p id="totalLogs" class="text-2xl font-bold text-red-400">0</p>
                    </div>
                    <i class="fas fa-list text-3xl text-red-400"></i>
                </div>
            </div>
        </div>

        <!-- Debug Console e Código -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Debug Console -->
            <div class="debug-container rounded-xl p-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-bold text-green-400">
                        <i class="fas fa-terminal mr-2"></i>Debug Console
                    </h2>
                    <div class="flex space-x-2">
                        <button onclick="testFilters()" class="px-3 py-1 bg-orange-600 hover:bg-orange-700 rounded text-sm">
                            <i class="fas fa-vial"></i> Testar Filtros
                        </button>
                        <button onclick="clearLogs()" class="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm">
                            <i class="fas fa-trash"></i> Limpar
                        </button>
                    </div>
                </div>
                <div id="debugOutput" class="h-96 overflow-y-auto border border-gray-700 rounded p-4 bg-black bg-opacity-50">
                    <div class="debug-log debug-success">
                        [SISTEMA] Debug Console inicializado com sucesso!
                    </div>
                </div>
            </div>

            <!-- Código JavaScript -->
            <div class="debug-container rounded-xl p-6">
                <h2 class="text-xl font-bold text-blue-400 mb-4">
                    <i class="fas fa-code mr-2"></i>Código do Sistema Debug
                </h2>
                <div class="code-block h-96 overflow-y-auto">
<pre><code>// ===== SISTEMA DE DEBUG MC CONSULTORIA =====
const Debug = {
    logs: [],
    isVisible: true,
    startTime: performance.now(),
    
    log(message, type = 'info', data = null) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = { 
            timestamp, 
            message, 
            type, 
            data,
            id: Date.now() + Math.random()
        };
        
        this.logs.push(logEntry);
        
        // Limitar logs (performance)
        if (this.logs.length > 200) {
            this.logs = this.logs.slice(-100);
        }
        
        this.updateConsole();
        this.updateMetrics();
        
        // Console nativo também
        const method = type === 'error' ? 'error' : 
                     type === 'warning' ? 'warn' : 'log';
        console[method](`[${timestamp}] ${message}`, data || '');
    },
    
    updateConsole() {
        const output = document.getElementById('debugOutput');
        if (!output) return;
        
        const html = this.logs.slice(-30).map(log => 
            `<div class="debug-log debug-${log.type}">
                <strong>[${log.timestamp}]</strong> ${log.message}
                ${log.data ? `<br><small><pre>${JSON.stringify(log.data, null, 2)}</pre></small>` : ''}
            </div>`
        ).join('');
        
        output.innerHTML = html;
        output.scrollTop = output.scrollHeight;
    },
    
    updateMetrics() {
        document.getElementById('totalLogs').textContent = this.logs.length;
        
        // Memória (aproximada)
        if (performance.memory) {
            const used = performance.memory.usedJSHeapSize / 1048576;
            document.getElementById('memoryUsage').textContent = used.toFixed(1) + 'MB';
        }
    }
};

// ===== PERFORMANCE MONITOR =====
const Performance = {
    start(operation) {
        this.startTime = performance.now();
        Debug.log(`🚀 Iniciando: ${operation}`, 'info');
    },
    
    end(operation) {
        const duration = performance.now() - this.startTime;
        document.getElementById('responseTime').textContent = duration.toFixed(0) + 'ms';
        Debug.log(`✅ Concluído: ${operation} (${duration.toFixed(2)}ms)`, 'success');
        return duration;
    }
};

// ===== FILTER TESTER =====
function testFilters() {
    Debug.log('🧪 TESTE DE FILTROS MÚLTIPLOS INICIADO', 'filter');
    
    // Simular filtros múltiplos
    const mockFilters = {
        modalidades: ['Pregão - Eletrônico', 'Concorrência - Eletrônica'],
        tipologias: ['Obra/Construção', 'Projetos/Serviços de Engenharia'],
        municipio: 'Belo Horizonte',
        modo_disputa: 'Aberto',
        ano_compra: 2024,
        valorMinimo: 100000,
        valorMaximo: 5000000
    };
    
    Debug.log('📊 Filtros de teste aplicados:', 'filter', mockFilters);
    
    // Simular processamento
    Performance.start('Teste de Filtros');
    
    setTimeout(() => {
        Performance.end('Teste de Filtros');
        Debug.log('✅ Teste concluído com sucesso!', 'success');
        
        document.getElementById('activeFiltersCount').textContent = 
            mockFilters.modalidades.length + mockFilters.tipologias.length + 4;
    }, 1500);
}</code></pre>
                </div>
            </div>
        </div>

        <!-- Teste de Filtros Interativo -->
        <div class="mt-8 debug-container rounded-xl p-6">
            <h2 class="text-xl font-bold text-orange-400 mb-4">
                <i class="fas fa-flask mr-2"></i>Teste Interativo de Filtros
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">Modalidades</label>
                    <select multiple class="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white" id="testModalidades">
                        <option value="Pregão - Eletrônico">Pregão - Eletrônico</option>
                        <option value="Concorrência - Eletrônica">Concorrência - Eletrônica</option>
                        <option value="Pregão - Presencial">Pregão - Presencial</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">Tipologias</label>
                    <select multiple class="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white" id="testTipologias">
                        <option value="Obra/Construção">Obra/Construção</option>
                        <option value="Projetos/Serviços de Engenharia">Projetos/Serviços</option>
                        <option value="Manutenção">Manutenção</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">Município</label>
                    <input type="text" class="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white" 
                           id="testMunicipio" placeholder="Ex: Belo Horizonte">
                </div>
            </div>
            
            <div class="mt-4 flex space-x-4">
                <button onclick="runInteractiveTest()" class="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold">
                    <i class="fas fa-play"></i> Executar Teste
                </button>
                <button onclick="simulateError()" class="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold">
                    <i class="fas fa-exclamation-triangle"></i> Simular Erro
                </button>
                <button onclick="stressTest()" class="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-bold">
                    <i class="fas fa-bolt"></i> Teste de Stress
                </button>
            </div>
        </div>
    </div>

    <script>
        // =====================================
        // 🐛 SISTEMA DE DEBUG MC CONSULTORIA
        // =====================================
        const Debug = {
            logs: [],
            isVisible: true,
            startTime: performance.now(),
            
            log(message, type = 'info', data = null) {
                const timestamp = new Date().toLocaleTimeString();
                const logEntry = { 
                    timestamp, 
                    message, 
                    type, 
                    data,
                    id: Date.now() + Math.random()
                };
                
                this.logs.push(logEntry);
                
                // Limitar logs para performance
                if (this.logs.length > 200) {
                    this.logs = this.logs.slice(-100);
                }
                
                this.updateConsole();
                this.updateMetrics();
                
                // Console nativo também
                const method = type === 'error' ? 'error' : 
                             type === 'warning' ? 'warn' : 'log';
                console[method](`[${timestamp}] ${message}`, data || '');
            },
            
            updateConsole() {
                const output = document.getElementById('debugOutput');
                if (!output) return;
                
                const html = this.logs.slice(-30).map(log => 
                    `<div class="debug-log debug-${log.type}">
                        <strong>[${log.timestamp}]</strong> ${log.message}
                        ${log.data ? `<br><small><pre>${JSON.stringify(log.data, null, 2)}</pre></small>` : ''}
                    </div>`
                ).join('');
                
                output.innerHTML = html;
                output.scrollTop = output.scrollHeight;
            },
            
            updateMetrics() {
                document.getElementById('totalLogs').textContent = this.logs.length;
                
                // Memória (se disponível)
                if (performance.memory) {
                    const used = performance.memory.usedJSHeapSize / 1048576;
                    document.getElementById('memoryUsage').textContent = used.toFixed(1) + 'MB';
                }
            }
        };

        // =====================================
        // ⚡ PERFORMANCE MONITOR
        // =====================================
        const Performance = {
            startTime: 0,
            
            start(operation) {
                this.startTime = performance.now();
                Debug.log(`🚀 Iniciando: ${operation}`, 'info');
            },
            
            end(operation) {
                const duration = performance.now() - this.startTime;
                document.getElementById('responseTime').textContent = duration.toFixed(0) + 'ms';
                Debug.log(`✅ Concluído: ${operation} (${duration.toFixed(2)}ms)`, 'success');
                return duration;
            }
        };

        // =====================================
        // 🧪 FUNÇÕES DE TESTE
        // =====================================
        function testFilters() {
            Debug.log('🧪 TESTE DE FILTROS MÚLTIPLOS INICIADO', 'filter');
            
            const mockFilters = {
                modalidades: ['Pregão - Eletrônico', 'Concorrência - Eletrônica'],
                tipologias: ['Obra/Construção', 'Projetos/Serviços de Engenharia'],
                municipio: 'Belo Horizonte',
                modo_disputa: 'Aberto',
                ano_compra: 2024,
                valorMinimo: 100000,
                valorMaximo: 5000000
            };
            
            Debug.log('📊 Filtros de teste aplicados:', 'filter', mockFilters);
            
            Performance.start('Teste de Filtros');
            
            setTimeout(() => {
                Performance.end('Teste de Filtros');
                Debug.log('✅ Teste concluído com sucesso!', 'success');
                
                document.getElementById('activeFiltersCount').textContent = 
                    mockFilters.modalidades.length + mockFilters.tipologias.length + 4;
            }, 1500);
        }

        function runInteractiveTest() {
            const modalidades = Array.from(document.getElementById('testModalidades').selectedOptions).map(o => o.value);
            const tipologias = Array.from(document.getElementById('testTipologias').selectedOptions).map(o => o.value);
            const municipio = document.getElementById('testMunicipio').value;
            
            const filters = {
                modalidades,
                tipologias,
                municipio
            };
            
            Debug.log('🎯 TESTE INTERATIVO EXECUTADO', 'filter', filters);
            
            Performance.start('Teste Interativo');
            
            setTimeout(() => {
                Performance.end('Teste Interativo');
                Debug.log(`✅ Filtros processados: ${modalidades.length + tipologias.length} ativos`, 'success');
                document.getElementById('activeFiltersCount').textContent = modalidades.length + tipologias.length;
            }, 800);
        }

        function simulateError() {
            Debug.log('❌ SIMULANDO ERRO DE CONEXÃO', 'error');
            Debug.log('Erro simulado: Timeout na consulta ao banco de dados', 'error', {
                endpoint: 'https://n8n.mcconsultoria.shop/webhook/consultaproduto1',
                status: 'timeout',
                duration: '30000ms'
            });
        }

        function stressTest() {
            Debug.log('⚡ INICIANDO TESTE DE STRESS', 'warning');
            
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    Debug.log(`Teste ${i + 1}/50: Processando filtros múltiplos...`, 'info');
                }, i * 50);
            }
            
            setTimeout(() => {
                Debug.log('✅ TESTE DE STRESS CONCLUÍDO', 'success');
            }, 2500);
        }

        function clearLogs() {
            Debug.logs = [];
            Debug.updateConsole();
            Debug.updateMetrics();
            Debug.log('🧹 Logs limpos', 'info');
        }

        function toggleDebugMode() {
            Debug.isVisible = !Debug.isVisible;
            Debug.log(`Debug mode: ${Debug.isVisible ? 'ATIVADO' : 'DESATIVADO'}`, 'info');
        }

        // =====================================
        // 🚀 INICIALIZAÇÃO
        // =====================================
        document.addEventListener('DOMContentLoaded', function() {
            Debug.log('🚀 Sistema de Debug MC Consultoria inicializado', 'success');
            
            // Atualizar relógio
            setInterval(() => {
                document.getElementById('systemTime').textContent = new Date().toLocaleTimeString();
            }, 1000);
            
            // Métricas periódicas
            setInterval(() => {
                Debug.updateMetrics();
            }, 5000);
            
            Debug.log('⚙️ Monitoramento ativo: Filtros múltiplos, Performance, Memória', 'info');
        });
    </script>
</body>
</html>
