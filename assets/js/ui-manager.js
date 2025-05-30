<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>04-ui-manager.js - Gerenciador de Interface</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
    <style>
        body { 
            font-family: 'Inter', sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .code-container {
            background: rgba(0, 0, 0, 0.95);
            border-radius: 15px;
            padding: 25px;
            margin: 20px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .code-block {
            background: #1a1a1a;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 20px;
            margin: 15px 0;
            overflow-x: auto;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            line-height: 1.5;
        }
        .comment { color: #6a9955; }
        .keyword { color: #569cd6; }
        .string { color: #ce9178; }
        .function { color: #dcdcaa; }
        .variable { color: #9cdcfe; }
        .operator { color: #d4d4d4; }
        .number { color: #b5cea8; }
        .glass-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
            border-radius: 15px;
            padding: 25px;
            margin: 20px;
        }
        .demo-button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 5px;
        }
        .demo-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }
        .spinner {
            border: 3px solid rgba(255,255,255,.3);
            border-radius: 50%;
            border-top-color: #fff;
            width: 20px;
            height: 20px;
            animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .fade-in { animation: fadeIn 0.6s ease-in; }
        .slide-up { animation: slideUp 0.8s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    </style>
</head>
<body>
    <div class="glass-card">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">
                    <i class="fas fa-desktop mr-3 text-blue-600"></i>
                    04-ui-manager.js
                </h1>
                <p class="text-gray-600">Sistema Centralizado de Gerenciamento da Interface</p>
            </div>
            <div class="text-right">
                <div class="text-sm text-gray-500">MC Consultoria</div>
                <div class="text-xs text-gray-400">Modular System v1.0</div>
            </div>
        </div>

        <!-- Funcionalidades -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <i class="fas fa-spinner text-blue-600 mb-2"></i>
                <h3 class="font-semibold text-blue-800">Loaders</h3>
                <p class="text-sm text-blue-600">Controle centralizado de loading states</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                <i class="fas fa-money-bill text-green-600 mb-2"></i>
                <h3 class="font-semibold text-green-800">Formatações</h3>
                <p class="text-sm text-green-600">Moeda, data e números brasileiros</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <i class="fas fa-magic text-purple-600 mb-2"></i>
                <h3 class="font-semibold text-purple-800">Animações</h3>
                <p class="text-sm text-purple-600">Transições e efeitos visuais</p>
            </div>
        </div>

        <!-- Demo Section -->
        <div class="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 class="font-semibold mb-3">🎮 Demonstração das Funcionalidades:</h3>
            <div class="space-y-3">
                <div>
                    <button class="demo-button" onclick="demoLoader()">
                        <i class="fas fa-play mr-2"></i>Testar Loader
                    </button>
                    <button class="demo-button" onclick="demoFormatCurrency()">
                        <i class="fas fa-dollar-sign mr-2"></i>Formatar Moeda
                    </button>
                    <button class="demo-button" onclick="demoAnimation()">
                        <i class="fas fa-magic mr-2"></i>Animação
                    </button>
                </div>
                <div id="demoOutput" class="bg-white p-3 rounded border min-h-12 text-sm"></div>
            </div>
        </div>
    </div>

    <div class="code-container">
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-white">
                <i class="fas fa-code mr-2"></i>
                Código Fonte Completo
            </h2>
            <button onclick="copyCode()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                <i class="fas fa-copy mr-2"></i>Copiar Código
            </button>
        </div>

        <div class="code-block" id="sourceCode">
<span class="comment">// =====================================</span>
<span class="comment">// 🎨 UI MANAGER - MC CONSULTORIA</span>
<span class="comment">// Sistema Centralizado de Gerenciamento da Interface</span>
<span class="comment">// =====================================</span>

<span class="keyword">const</span> <span class="variable">UIManager</span> <span class="operator">=</span> {
    <span class="comment">// 📦 Cache de elementos DOM</span>
    <span class="function">elements</span>: {},
    
    <span class="comment">// 🎯 Inicialização do sistema</span>
    <span class="function">init</span>() {
        <span class="keyword">this</span>.<span class="function">cacheElements</span>();
        <span class="keyword">this</span>.<span class="function">setupAnimations</span>();
        <span class="keyword">this</span>.<span class="function">setupFormatters</span>();
        
        <span class="keyword">if</span> (<span class="variable">window</span>.<span class="variable">Debug</span>) {
            <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'🎨 UIManager inicializado com sucesso'</span>, <span class="string">'success'</span>);
        }
        
        <span class="keyword">return</span> <span class="keyword">this</span>;
    },
    
    <span class="comment">// 🗂️ Cache de elementos principais</span>
    <span class="function">cacheElements</span>() {
        <span class="keyword">this</span>.<span class="variable">elements</span> <span class="operator">=</span> {
            <span class="comment">// Telas principais</span>
            <span class="variable">loginScreen</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'loginScreen'</span>),
            <span class="variable">mainDashboard</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'mainDashboard'</span>),
            
            <span class="comment">// Formulários</span>
            <span class="variable">loginForm</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'loginForm'</span>),
            <span class="variable">loginError</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'loginError'</span>),
            <span class="variable">loginSuccess</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'loginSuccess'</span>),
            
            <span class="comment">// Botões e loaders</span>
            <span class="variable">loginBtn</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'loginBtn'</span>),
            <span class="variable">searchBtn</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'searchBtn'</span>),
            
            <span class="comment">// Seções de resultados</span>
            <span class="variable">resultsTableBody</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'resultsTableBody'</span>),
            <span class="variable">paginationSection</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'paginationSection'</span>),
            <span class="variable">resultsCount</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'resultsCount'</span>),
            
            <span class="comment">// Seções do dashboard</span>
            <span class="variable">statsSection</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'statsSection'</span>),
            <span class="variable">chartsSection</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'chartsSection'</span>),
            <span class="variable">resultsSection</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'resultsSection'</span>),
            
            <span class="comment">// Stats específicos</span>
            <span class="variable">quickTotal</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'quickTotal'</span>),
            <span class="variable">quickValue</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'quickValue'</span>),
            <span class="variable">queryTime</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'queryTime'</span>),
            <span class="variable">activeFilters</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'activeFilters'</span>),
            
            <span class="comment">// Sistema de status</span>
            <span class="variable">lastUpdate</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'lastUpdate'</span>),
            <span class="variable">systemStatus</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'systemStatus'</span>)
        };
        
        <span class="comment">// Verificar elementos obrigatórios</span>
        <span class="keyword">const</span> <span class="variable">missingElements</span> <span class="operator">=</span> <span class="variable">Object</span>.<span class="function">entries</span>(<span class="keyword">this</span>.<span class="variable">elements</span>)
            .<span class="function">filter</span>(([<span class="variable">key</span>, <span class="variable">element</span>]) <span class="operator">=></span> <span class="operator">!</span><span class="variable">element</span>)
            .<span class="function">map</span>(([<span class="variable">key</span>]) <span class="operator">=></span> <span class="variable">key</span>);
            
        <span class="keyword">if</span> (<span class="variable">missingElements</span>.<span class="variable">length</span> <span class="operator">></span> <span class="number">0</span> <span class="operator">&&</span> <span class="variable">window</span>.<span class="variable">Debug</span>) {
            <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'⚠️ Elementos não encontrados:'</span>, <span class="string">'warning'</span>, <span class="variable">missingElements</span>);
        }
    },
    
    <span class="comment">// ⏳ SISTEMA DE LOADERS</span>
    <span class="function">showLoader</span>(<span class="variable">buttonOrId</span>, <span class="variable">customText</span> <span class="operator">=</span> <span class="keyword">null</span>) {
        <span class="keyword">const</span> <span class="variable">btn</span> <span class="operator">=</span> <span class="keyword">typeof</span> <span class="variable">buttonOrId</span> <span class="operator">===</span> <span class="string">'string'</span> 
            <span class="operator">?</span> <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="variable">buttonOrId</span>) 
            : <span class="variable">buttonOrId</span>;
            
        <span class="keyword">if</span> (<span class="operator">!</span><span class="variable">btn</span>) {
            <span class="keyword">if</span> (<span class="variable">window</span>.<span class="variable">Debug</span>) {
                <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'❌ Botão não encontrado para loader'</span>, <span class="string">'error'</span>, <span class="variable">buttonOrId</span>);
            }
            <span class="keyword">return</span>;
        }
        
        <span class="comment">// Localizar elementos de texto e loader</span>
        <span class="keyword">const</span> <span class="variable">textEl</span> <span class="operator">=</span> <span class="variable">btn</span>.<span class="function">querySelector</span>(<span class="string">'[id$="Text"]'</span>) <span class="operator">||</span> <span class="variable">btn</span>.<span class="function">querySelector</span>(<span class="string">'.btn-text'</span>);
        <span class="keyword">const</span> <span class="variable">loaderEl</span> <span class="operator">=</span> <span class="variable">btn</span>.<span class="function">querySelector</span>(<span class="string">'[id$="Loader"]'</span>) <span class="operator">||</span> <span class="variable">btn</span>.<span class="function">querySelector</span>(<span class="string">'.btn-loader'</span>);
        
        <span class="comment">// Ocultar texto</span>
        <span class="keyword">if</span> (<span class="variable">textEl</span>) {
            <span class="variable">textEl</span>.<span class="variable">classList</span>.<span class="function">add</span>(<span class="string">'hidden'</span>);
            <span class="keyword">if</span> (<span class="variable">customText</span>) <span class="variable">textEl</span>.<span class="variable">textContent</span> <span class="operator">=</span> <span class="variable">customText</span>;
        }
        
        <span class="comment">// Mostrar loader</span>
        <span class="keyword">if</span> (<span class="variable">loaderEl</span>) {
            <span class="variable">loaderEl</span>.<span class="variable">classList</span>.<span class="function">remove</span>(<span class="string">'hidden'</span>);
        } <span class="keyword">else</span> {
            <span class="comment">// Criar loader se não existir</span>
            <span class="keyword">const</span> <span class="variable">newLoader</span> <span class="operator">=</span> <span class="variable">document</span>.<span class="function">createElement</span>(<span class="string">'div'</span>);
            <span class="variable">newLoader</span>.<span class="variable">className</span> <span class="operator">=</span> <span class="string">'spinner btn-loader ml-2'</span>;
            <span class="variable">btn</span>.<span class="function">appendChild</span>(<span class="variable">newLoader</span>);
        }
        
        <span class="variable">btn</span>.<span class="variable">disabled</span> <span class="operator">=</span> <span class="keyword">true</span>;
        <span class="variable">btn</span>.<span class="variable">classList</span>.<span class="function">add</span>(<span class="string">'loading'</span>);
        
        <span class="keyword">if</span> (<span class="variable">window</span>.<span class="variable">Debug</span>) {
            <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'⏳ Loader ativado'</span>, <span class="string">'info'</span>, <span class="variable">btn</span>.<span class="variable">id</span> <span class="operator">||</span> <span class="string">'botão sem ID'</span>);
        }
    },
    
    <span class="function">hideLoader</span>(<span class="variable">buttonOrId</span>) {
        <span class="keyword">const</span> <span class="variable">btn</span> <span class="operator">=</span> <span class="keyword">typeof</span> <span class="variable">buttonOrId</span> <span class="operator">===</span> <span class="string">'string'</span> 
            <span class="operator">?</span> <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="variable">buttonOrId</span>) 
            : <span class="variable">buttonOrId</span>;
            
        <span class="keyword">if</span> (<span class="operator">!</span><span class="variable">btn</span>) <span class="keyword">return</span>;
        
        <span class="keyword">const</span> <span class="variable">textEl</span> <span class="operator">=</span> <span class="variable">btn</span>.<span class="function">querySelector</span>(<span class="string">'[id$="Text"]'</span>) <span class="operator">||</span> <span class="variable">btn</span>.<span class="function">querySelector</span>(<span class="string">'.btn-text'</span>);
        <span class="keyword">const</span> <span class="variable">loaderEl</span> <span class="operator">=</span> <span class="variable">btn</span>.<span class="function">querySelector</span>(<span class="string">'[id$="Loader"]'</span>) <span class="operator">||</span> <span class="variable">btn</span>.<span class="function">querySelector</span>(<span class="string">'.btn-loader'</span>);
        
        <span class="keyword">if</span> (<span class="variable">textEl</span>) <span class="variable">textEl</span>.<span class="variable">classList</span>.<span class="function">remove</span>(<span class="string">'hidden'</span>);
        <span class="keyword">if</span> (<span class="variable">loaderEl</span>) <span class="variable">loaderEl</span>.<span class="variable">classList</span>.<span class="function">add</span>(<span class="string">'hidden'</span>);
        
        <span class="variable">btn</span>.<span class="variable">disabled</span> <span class="operator">=</span> <span class="keyword">false</span>;
        <span class="variable">btn</span>.<span class="variable">classList</span>.<span class="function">remove</span>(<span class="string">'loading'</span>);
        
        <span class="keyword">if</span> (<span class="variable">window</span>.<span class="variable">Debug</span>) {
            <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'✅ Loader desativado'</span>, <span class="string">'success'</span>, <span class="variable">btn</span>.<span class="variable">id</span> <span class="operator">||</span> <span class="string">'botão sem ID'</span>);
        }
    },
    
    <span class="comment">// 📄 SISTEMA DE MENSAGENS</span>
    <span class="function">showError</span>(<span class="variable">elementId</span>, <span class="variable">message</span>, <span class="variable">autoHide</span> <span class="operator">=</span> <span class="keyword">false</span>) {
        <span class="keyword">const</span> <span class="variable">el</span> <span class="operator">=</span> <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="variable">elementId</span>);
        <span class="keyword">if</span> (<span class="variable">el</span>) {
            <span class="variable">el</span>.<span class="variable">textContent</span> <span class="operator">=</span> <span class="variable">message</span>;
            <span class="variable">el</span>.<span class="variable">classList</span>.<span class="function">remove</span>(<span class="string">'hidden'</span>);
            <span class="variable">el</span>.<span class="variable">classList</span>.<span class="function">add</span>(<span class="string">'fade-in'</span>);
            
            <span class="keyword">if</span> (<span class="variable">autoHide</span>) {
                <span class="function">setTimeout</span>(() <span class="operator">=></span> <span class="keyword">this</span>.<span class="function">hideError</span>(<span class="variable">elementId</span>), <span class="number">5000</span>);
            }
        }
        
        <span class="keyword">if</span> (<span class="variable">window</span>.<span class="variable">Debug</span>) {
            <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">`❌ Erro mostrado: ${message}`</span>, <span class="string">'error'</span>);
        }
    },
    
    <span class="function">hideError</span>(<span class="variable">elementId</span>) {
        <span class="keyword">const</span> <span class="variable">el</span> <span class="operator">=</span> <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="variable">elementId</span>);
        <span class="keyword">if</span> (<span class="variable">el</span>) <span class="variable">el</span>.<span class="variable">classList</span>.<span class="function">add</span>(<span class="string">'hidden'</span>);
    },
    
    <span class="function">showSuccess</span>(<span class="variable">elementId</span>, <span class="variable">message</span>, <span class="variable">autoHide</span> <span class="operator">=</span> <span class="keyword">true</span>) {
        <span class="keyword">const</span> <span class="variable">el</span> <span class="operator">=</span> <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="variable">elementId</span>);
        <span class="keyword">if</span> (<span class="variable">el</span>) {
            <span class="variable">el</span>.<span class="variable">textContent</span> <span class="operator">=</span> <span class="variable">message</span>;
            <span class="variable">el</span>.<span class="variable">classList</span>.<span class="function">remove</span>(<span class="string">'hidden'</span>);
            <span class="variable">el</span>.<span class="variable">classList</span>.<span class="function">add</span>(<span class="string">'fade-in'</span>);
            
            <span class="keyword">if</span> (<span class="variable">autoHide</span>) {
                <span class="function">setTimeout</span>(() <span class="operator">=></span> {
                    <span class="variable">el</span>.<span class="variable">classList</span>.<span class="function">add</span>(<span class="string">'hidden'</span>);
                }, <span class="number">3000</span>);
            }
        }
        
        <span class="keyword">if</span> (<span class="variable">window</span>.<span class="variable">Debug</span>) {
            <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">`✅ Sucesso: ${message}`</span>, <span class="string">'success'</span>);
        }
    },
    
    <span class="comment">// 💰 FORMATAÇÃO DE MOEDA BRASILEIRA</span>
    <span class="function">formatCurrency</span>(<span class="variable">value</span>) {
        <span class="keyword">if</span> (<span class="operator">!</span><span class="variable">value</span> <span class="operator">||</span> <span class="function">isNaN</span>(<span class="variable">value</span>)) <span class="keyword">return</span> <span class="string">'R$ 0,00'</span>;
        
        <span class="keyword">return</span> <span class="keyword">new</span> <span class="variable">Intl</span>.<span class="function">NumberFormat</span>(<span class="string">'pt-BR'</span>, {
            <span class="variable">style</span>: <span class="string">'currency'</span>,
            <span class="variable">currency</span>: <span class="string">'BRL'</span>,
            <span class="variable">minimumFractionDigits</span>: <span class="number">2</span>,
            <span class="variable">maximumFractionDigits</span>: <span class="number">2</span>
        }).<span class="function">format</span>(<span class="variable">value</span>);
    },
    
    <span class="comment">// 📅 FORMATAÇÃO DE DATA</span>
    <span class="function">formatDate</span>(<span class="variable">dateString</span>) {
        <span class="keyword">if</span> (<span class="operator">!</span><span class="variable">dateString</span>) <span class="keyword">return</span> <span class="string">'-'</span>;
        
        <span class="keyword">try</span> {
            <span class="keyword">const</span> <span class="variable">date</span> <span class="operator">=</span> <span class="keyword">new</span> <span class="variable">Date</span>(<span class="variable">dateString</span>);
            <span class="keyword">return</span> <span class="variable">date</span>.<span class="function">toLocaleDateString</span>(<span class="string">'pt-BR'</span>);
        } <span class="keyword">catch</span> (<span class="variable">e</span>) {
            <span class="keyword">return</span> <span class="variable">dateString</span>;
        }
    },
    
    <span class="comment">// 🔢 FORMATAÇÃO DE NÚMEROS</span>
    <span class="function">formatNumber</span>(<span class="variable">value</span>, <span class="variable">decimals</span> <span class="operator">=</span> <span class="number">0</span>) {
        <span class="keyword">if</span> (<span class="operator">!</span><span class="variable">value</span> <span class="operator">||</span> <span class="function">isNaN</span>(<span class="variable">value</span>)) <span class="keyword">return</span> <span class="string">'0'</span>;
        
        <span class="keyword">return</span> <span class="keyword">new</span> <span class="variable">Intl</span>.<span class="function">NumberFormat</span>(<span class="string">'pt-BR'</span>, {
            <span class="variable">minimumFractionDigits</span>: <span class="variable">decimals</span>,
            <span class="variable">maximumFractionDigits</span>: <span class="variable">decimals</span>
        }).<span class="function">format</span>(<span class="variable">value</span>);
    },
    
    <span class="comment">// 📊 ATUALIZAÇÃO DE ESTATÍSTICAS RÁPIDAS</span>
    <span class="function">updateQuickStats</span>(<span class="variable">total</span>, <span class="variable">value</span>, <span class="variable">time</span>, <span class="variable">activeFiltersCount</span> <span class="operator">=</span> <span class="number">0</span>) {
        <span class="keyword">const</span> <span class="variable">updates</span> <span class="operator">=</span> [
            { <span class="variable">id</span>: <span class="string">'quickTotal'</span>, <span class="variable">value</span>: <span class="keyword">this</span>.<span class="function">formatNumber</span>(<span class="variable">total</span> <span class="operator">||</span> <span class="number">0</span>) },
            { <span class="variable">id</span>: <span class="string">'quickValue'</span>, <span class="variable">value</span>: <span class="keyword">this</span>.<span class="function">formatCurrency</span>(<span class="variable">value</span> <span class="operator">||</span> <span class="number">0</span>) },
            { <span class="variable">id</span>: <span class="string">'queryTime'</span>, <span class="variable">value</span>: <span class="string">`${time || 0}ms`</span> },
            { <span class="variable">id</span>: <span class="string">'activeFilters'</span>, <span class="variable">value</span>: <span class="variable">activeFiltersCount</span> <span class="operator">||</span> <span class="number">0</span> }
        ];
        
        <span class="variable">updates</span>.<span class="function">forEach</span>((<span class="variable">update</span>) <span class="operator">=></span> {
            <span class="keyword">const</span> <span class="variable">element</span> <span class="operator">=</span> <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="variable">update</span>.<span class="variable">id</span>);
            <span class="keyword">if</span> (<span class="variable">element</span>) {
                <span class="variable">element</span>.<span class="variable">textContent</span> <span class="operator">=</span> <span class="variable">update</span>.<span class="variable">value</span>;
                <span class="variable">element</span>.<span class="variable">classList</span>.<span class="function">add</span>(<span class="string">'fade-in'</span>);
            }
        });
        
        <span class="keyword">if</span> (<span class="variable">window</span>.<span class="variable">Debug</span>) {
            <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'📊 Stats atualizadas'</span>, <span class="string">'info'</span>, { <span class="variable">total</span>, <span class="variable">value</span>, <span class="variable">time</span>, <span class="variable">activeFiltersCount</span> });
        }
    },
    
    <span class="comment">// 🕒 ATUALIZAÇÃO DE TIMESTAMP</span>
    <span class="function">updateLastUpdate</span>() {
        <span class="keyword">const</span> <span class="variable">lastUpdateEl</span> <span class="operator">=</span> <span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">lastUpdate</span>;
        <span class="keyword">if</span> (<span class="variable">lastUpdateEl</span>) {
            <span class="keyword">const</span> <span class="variable">now</span> <span class="operator">=</span> <span class="keyword">new</span> <span class="variable">Date</span>();
            <span class="variable">lastUpdateEl</span>.<span class="variable">textContent</span> <span class="operator">=</span> <span class="string">`Última atualização: ${now.toLocaleTimeString('pt-BR')}`</span>;
        }
    },
    
    <span class="comment">// 🎭 SISTEMA DE ANIMAÇÕES</span>
    <span class="function">setupAnimations</span>() {
        <span class="comment">// Observer para animações de entrada</span>
        <span class="keyword">const</span> <span class="variable">observer</span> <span class="operator">=</span> <span class="keyword">new</span> <span class="variable">IntersectionObserver</span>((<span class="variable">entries</span>) <span class="operator">=></span> {
            <span class="variable">entries</span>.<span class="function">forEach</span>(<span class="variable">entry</span> <span class="operator">=></span> {
                <span class="keyword">if</span> (<span class="variable">entry</span>.<span class="variable">isIntersecting</span>) {
                    <span class="variable">entry</span>.<span class="variable">target</span>.<span class="variable">classList</span>.<span class="function">add</span>(<span class="string">'fade-in'</span>);
                }
            });
        });
        
        <span class="comment">// Observar elementos com classe slide-up</span>
        <span class="variable">document</span>.<span class="function">querySelectorAll</span>(<span class="string">'.slide-up'</span>).<span class="function">forEach</span>(<span class="variable">el</span> <span class="operator">=></span> {
            <span class="variable">observer</span>.<span class="function">observe</span>(<span class="variable">el</span>);
        });
    },
    
    <span class="function">addFadeInAnimation</span>(<span class="variable">element</span>) {
        <span class="keyword">if</span> (<span class="variable">element</span>) {
            <span class="variable">element</span>.<span class="variable">classList</span>.<span class="function">add</span>(<span class="string">'fade-in'</span>);
            <span class="function">setTimeout</span>(() <span class="operator">=></span> {
                <span class="variable">element</span>.<span class="variable">classList</span>.<span class="function">remove</span>(<span class="string">'fade-in'</span>);
            }, <span class="number">600</span>);
        }
    },
    
    <span class="comment">// 🎨 CONTROLE DE SEÇÕES</span>
    <span class="function">showSection</span>(<span class="variable">sectionId</span>, <span class="variable">animate</span> <span class="operator">=</span> <span class="keyword">true</span>) {
        <span class="keyword">const</span> <span class="variable">section</span> <span class="operator">=</span> <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="variable">sectionId</span>);
        <span class="keyword">if</span> (<span class="variable">section</span>) {
            <span class="variable">section</span>.<span class="variable">classList</span>.<span class="function">remove</span>(<span class="string">'hidden'</span>);
            <span class="keyword">if</span> (<span class="variable">animate</span>) {
                <span class="keyword">this</span>.<span class="function">addFadeInAnimation</span>(<span class="variable">section</span>);
            }
        }
    },
    
    <span class="function">hideSection</span>(<span class="variable">sectionId</span>) {
        <span class="keyword">const</span> <span class="variable">section</span> <span class="operator">=</span> <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="variable">sectionId</span>);
        <span class="keyword">if</span> (<span class="variable">section</span>) {
            <span class="variable">section</span>.<span class="variable">classList</span>.<span class="function">add</span>(<span class="string">'hidden'</span>);
        }
    },
    
    <span class="comment">// 💫 FORMATADORES DE INPUT EM TEMPO REAL</span>
    <span class="function">setupFormatters</span>() {
        <span class="comment">// Formatação automática de campos de moeda</span>
        <span class="variable">document</span>.<span class="function">querySelectorAll</span>(<span class="string">'input[data-format="currency"]'</span>).<span class="function">forEach</span>(<span class="variable">input</span> <span class="operator">=></span> {
            <span class="variable">input</span>.<span class="function">addEventListener</span>(<span class="string">'input'</span>, <span class="keyword">this</span>.<span class="function">formatCurrencyInput</span>.<span class="function">bind</span>(<span class="keyword">this</span>));
        });
        
        <span class="comment">// Formatação de números</span>
        <span class="variable">document</span>.<span class="function">querySelectorAll</span>(<span class="string">'input[data-format="number"]'</span>).<span class="function">forEach</span>(<span class="variable">input</span> <span class="operator">=></span> {
            <span class="variable">input</span>.<span class="function">addEventListener</span>(<span class="string">'input'</span>, <span class="keyword">this</span>.<span class="function">formatNumberInput</span>.<span class="function">bind</span>(<span class="keyword">this</span>));
        });
    },
    
    <span class="function">formatCurrencyInput</span>(<span class="variable">event</span>) {
        <span class="keyword">const</span> <span class="variable">input</span> <span class="operator">=</span> <span class="variable">event</span>.<span class="variable">target</span>;
        <span class="keyword">let</span> <span class="variable">value</span> <span class="operator">=</span> <span class="variable">input</span>.<span class="variable">value</span>.<span class="function">replace</span>(<span class="string">/\D/g</span>, <span class="string">''</span>);
        
        <span class="keyword">if</span> (<span class="operator">!</span><span class="variable">value</span>) {
            <span class="variable">input</span>.<span class="variable">value</span> <span class="operator">=</span> <span class="string">''</span>;
            <span class="keyword">return</span>;
        }
        
        <span class="variable">value</span> <span class="operator">=</span> <span class="function">parseInt</span>(<span class="variable">value</span>) <span class="operator">/</span> <span class="number">100</span>;
        <span class="variable">input</span>.<span class="variable">value</span> <span class="operator">=</span> <span class="keyword">this</span>.<span class="function">formatCurrency</span>(<span class="variable">value</span>);
    },
    
    <span class="function">formatNumberInput</span>(<span class="variable">event</span>) {
        <span class="keyword">const</span> <span class="variable">input</span> <span class="operator">=</span> <span class="variable">event</span>.<span class="variable">target</span>;
        <span class="keyword">const</span> <span class="variable">value</span> <span class="operator">=</span> <span class="variable">input</span>.<span class="variable">value</span>.<span class="function">replace</span>(<span class="string">/\D/g</span>, <span class="string">''</span>);
        
        <span class="keyword">if</span> (<span class="variable">value</span>) {
            <span class="variable">input</span>.<span class="variable">value</span> <span class="operator">=</span> <span class="keyword">this</span>.<span class="function">formatNumber</span>(<span class="function">parseInt</span>(<span class="variable">value</span>));
        }
    },
    
    <span class="comment">// 📱 RESPONSIVIDADE E UTILITÁRIOS</span>
    <span class="function">isMobile</span>() {
        <span class="keyword">return</span> <span class="variable">window</span>.<span class="variable">innerWidth</span> <span class="operator"><=</span> <span class="number">768</span>;
    },
    
    <span class="function">scrollToTop</span>(<span class="variable">smooth</span> <span class="operator">=</span> <span class="keyword">true</span>) {
        <span class="variable">window</span>.<span class="function">scrollTo</span>({
            <span class="variable">top</span>: <span class="number">0</span>,
            <span class="variable">behavior</span>: <span class="variable">smooth</span> <span class="operator">?</span> <span class="string">'smooth'</span> : <span class="string">'auto'</span>
        });
    },
    
    <span class="comment">// 🔄 MÉTODO DE RESET GERAL</span>
    <span class="function">reset</span>() {
        <span class="comment">// Ocultar todas as seções principais</span>
        <span class="keyword">const</span> <span class="variable">sectionsToHide</span> <span class="operator">=</span> [<span class="string">'statsSection'</span>, <span class="string">'chartsSection'</span>, <span class="string">'resultsSection'</span>];
        <span class="variable">sectionsToHide</span>.<span class="function">forEach</span>(<span class="variable">sectionId</span> <span class="operator">=></span> <span class="keyword">this</span>.<span class="function">hideSection</span>(<span class="variable">sectionId</span>));
        
        <span class="comment">// Limpar loaders ativos</span>
        <span class="variable">document</span>.<span class="function">querySelectorAll</span>(<span class="string">'.loading'</span>).<span class="function">forEach</span>(<span class="variable">btn</span> <span class="operator">=></span> <span class="keyword">this</span>.<span class="function">hideLoader</span>(<span class="variable">btn</span>));
        
        <span class="comment">// Ocultar mensagens de erro</span>
        <span class="variable">document</span>.<span class="function">querySelectorAll</span>(<span class="string">'[id$="Error"], [id$="Success"]'</span>).<span class="function">forEach</span>(<span class="variable">el</span> <span class="operator">=></span> {
            <span class="variable">el</span>.<span class="variable">classList</span>.<span class="function">add</span>(<span class="string">'hidden'</span>);
        });
        
        <span class="keyword">if</span> (<span class="variable">window</span>.<span class="variable">Debug</span>) {
            <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'🔄 UIManager resetado'</span>, <span class="string">'info'</span>);
        }
    }
};

<span class="comment">// 🚀 Auto-inicialização quando disponível</span>
<span class="keyword">if</span> (<span class="keyword">typeof</span> <span class="variable">window</span> <span class="operator">!==</span> <span class="string">'undefined'</span>) {
    <span class="variable">window</span>.<span class="variable">UIManager</span> <span class="operator">=</span> <span class="variable">UIManager</span>;
    
    <span class="comment">// Inicializar quando DOM estiver pronto</span>
    <span class="keyword">if</span> (<span class="variable">document</span>.<span class="variable">readyState</span> <span class="operator">===</span> <span class="string">'loading'</span>) {
        <span class="variable">document</span>.<span class="function">addEventListener</span>(<span class="string">'DOMContentLoaded'</span>, () <span class="operator">=></span> <span class="variable">UIManager</span>.<span class="function">init</span>());
    } <span class="keyword">else</span> {
        <span class="variable">UIManager</span>.<span class="function">init</span>();
    }
}
        </div>
    </div>

    <script>
        // Demo functions for testing
        function demoLoader() {
            const output = document.getElementById('demoOutput');
            output.innerHTML = '<button id="demoBtn" class="demo-button">Testando Loader...</button>';
            
            const btn = document.getElementById('demoBtn');
            
            // Simular showLoader
            btn.innerHTML = '<span class="btn-text">Carregando</span><div class="spinner btn-loader ml-2"></div>';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<span class="btn-text">Concluído!</span>';
                btn.disabled = false;
                btn.style.background = '#10b981';
            }, 2000);
        }
        
        function demoFormatCurrency() {
            const output = document.getElementById('demoOutput');
            const values = [1234.56, 567890.12, 50.00, 1500000.99];
            
            let html = '<div class="space-y-2">';
            values.forEach(value => {
                const formatted = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(value);
                html += `<div><strong>Valor:</strong> ${value} → <span class="text-green-600">${formatted}</span></div>`;
            });
            html += '</div>';
            
            output.innerHTML = html;
        }
        
        function demoAnimation() {
            const output = document.getElementById('demoOutput');
            output.innerHTML = '<div id="animatedElement" class="bg-blue-100 p-4 rounded-lg text-center">🎉 Elemento Animado!</div>';
            
            const element = document.getElementById('animatedElement');
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100);
        }
        
        function copyCode() {
            const code = document.getElementById('sourceCode').textContent;
            navigator.clipboard.writeText(code).then(() => {
                alert('Código copiado para a área de transferência!');
            });
        }
    </script>
</body>
</html>
