<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>05-auth.js - Sistema de Autenticação MC Consultoria</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { font-family: 'Inter', sans-serif; }
        .code-block {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.5;
        }
        .comment { color: #6a9955; }
        .string { color: #ce9178; }
        .keyword { color: #569cd6; }
        .function { color: #dcdcaa; }
        .variable { color: #9cdcfe; }
        .number { color: #b5cea8; }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto p-6">
        <!-- Header -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-2">05-auth.js - Sistema de Autenticação</h1>
            <p class="text-gray-600">Sistema completo de autenticação com validação e controle de sessão para MC Consultoria</p>
            <div class="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                <span>📁 assets/js/05-auth.js</span>
                <span>🔐 Login/Logout</span>
                <span>⏱️ Timeout Control</span>
                <span>🛡️ Session Management</span>
            </div>
        </div>

        <!-- Código Principal -->
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
                <h2 class="font-semibold">📄 assets/js/05-auth.js</h2>
                <button onclick="copyCode()" class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
                    📋 Copiar Código
                </button>
            </div>
            
            <div class="code-block">
<pre id="codeContent"><span class="comment">// =====================================
// 🔐 SISTEMA DE AUTENTICAÇÃO MC CONSULTORIA
// =====================================</span>

<span class="keyword">const</span> <span class="variable">Auth</span> = {
    <span class="comment">// Estado da autenticação</span>
    <span class="variable">isAuthenticated</span>: <span class="keyword">false</span>,
    <span class="variable">currentUser</span>: <span class="keyword">null</span>,
    <span class="variable">sessionTimeout</span>: <span class="keyword">null</span>,
    <span class="variable">loginAttempts</span>: <span class="number">0</span>,
    <span class="variable">maxAttempts</span>: <span class="number">3</span>,
    <span class="variable">lockoutTime</span>: <span class="number">300000</span>, <span class="comment">// 5 minutos</span>
    <span class="variable">sessionDuration</span>: <span class="number">3600000</span>, <span class="comment">// 1 hora</span>

    <span class="comment">// Elementos da interface</span>
    <span class="variable">elements</span>: {},

    <span class="comment">/**
     * 🚀 Inicializar sistema de autenticação
     */</span>
    <span class="function">init</span>() {
        <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'🔐 Inicializando sistema de autenticação...'</span>, <span class="string">'info'</span>);
        
        <span class="keyword">this</span>.<span class="function">cacheElements</span>();
        <span class="keyword">this</span>.<span class="function">setupEventListeners</span>();
        <span class="keyword">this</span>.<span class="function">checkExistingSession</span>();
        <span class="keyword">this</span>.<span class="function">testConnection</span>();
        
        <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'✅ Sistema de autenticação inicializado'</span>, <span class="string">'success'</span>);
    },

    <span class="comment">/**
     * 📝 Cache dos elementos da interface
     */</span>
    <span class="function">cacheElements</span>() {
        <span class="keyword">this</span>.<span class="variable">elements</span> = {
            <span class="variable">loginScreen</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'loginScreen'</span>),
            <span class="variable">mainDashboard</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'mainDashboard'</span>),
            <span class="variable">loginForm</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'loginForm'</span>),
            <span class="variable">usernameInput</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'username'</span>),
            <span class="variable">passwordInput</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'password'</span>),
            <span class="variable">loginBtn</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'loginBtn'</span>),
            <span class="variable">loginText</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'loginText'</span>),
            <span class="variable">loginLoader</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'loginLoader'</span>),
            <span class="variable">loginError</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'loginError'</span>),
            <span class="variable">loginSuccess</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'loginSuccess'</span>),
            <span class="variable">connectionStatus</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'connectionStatus'</span>),
            <span class="variable">connectionProgress</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'connectionProgress'</span>),
            <span class="variable">systemStatus</span>: <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="string">'systemStatus'</span>)
        };

        <span class="comment">// Validar elementos críticos</span>
        <span class="keyword">const</span> <span class="variable">critical</span> = [<span class="string">'loginScreen'</span>, <span class="string">'mainDashboard'</span>, <span class="string">'loginForm'</span>];
        <span class="keyword">const</span> <span class="variable">missing</span> = <span class="variable">critical</span>.<span class="function">filter</span>(<span class="variable">id</span> => !<span class="keyword">this</span>.<span class="variable">elements</span>[<span class="variable">id</span>]);
        
        <span class="keyword">if</span> (<span class="variable">missing</span>.<span class="variable">length</span> > <span class="number">0</span>) {
            <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">`⚠️ Elementos críticos não encontrados: ${missing.join(', ')}`</span>, <span class="string">'warning'</span>);
        }
    },

    <span class="comment">/**
     * 🎯 Configurar event listeners
     */</span>
    <span class="function">setupEventListeners</span>() {
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">loginForm</span>) {
            <span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">loginForm</span>.<span class="function">addEventListener</span>(<span class="string">'submit'</span>, (<span class="variable">e</span>) => <span class="keyword">this</span>.<span class="function">handleLogin</span>(<span class="variable">e</span>));
        }

        <span class="comment">// Validação em tempo real</span>
        [<span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">usernameInput</span>, <span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">passwordInput</span>].<span class="function">forEach</span>(<span class="variable">input</span> => {
            <span class="keyword">if</span> (<span class="variable">input</span>) {
                <span class="variable">input</span>.<span class="function">addEventListener</span>(<span class="string">'input'</span>, () => <span class="keyword">this</span>.<span class="function">clearErrors</span>());
                <span class="variable">input</span>.<span class="function">addEventListener</span>(<span class="string">'keypress'</span>, (<span class="variable">e</span>) => {
                    <span class="keyword">if</span> (<span class="variable">e</span>.<span class="variable">key</span> === <span class="string">'Enter'</span>) <span class="keyword">this</span>.<span class="function">handleLogin</span>(<span class="variable">e</span>);
                });
            }
        });

        <span class="comment">// Auto-logout por inatividade</span>
        [<span class="string">'mousedown'</span>, <span class="string">'mousemove'</span>, <span class="string">'keypress'</span>, <span class="string">'scroll'</span>, <span class="string">'touchstart'</span>].<span class="function">forEach</span>(<span class="variable">event</span> => {
            <span class="variable">document</span>.<span class="function">addEventListener</span>(<span class="variable">event</span>, () => <span class="keyword">this</span>.<span class="function">resetSessionTimer</span>(), <span class="keyword">true</span>);
        });
    },

    <span class="comment">/**
     * 🔍 Verificar sessão existente
     */</span>
    <span class="function">checkExistingSession</span>() {
        <span class="keyword">const</span> <span class="variable">savedSession</span> = <span class="variable">localStorage</span>.<span class="function">getItem</span>(<span class="string">'mcConsultoriaSession'</span>);
        
        <span class="keyword">if</span> (<span class="variable">savedSession</span>) {
            <span class="keyword">try</span> {
                <span class="keyword">const</span> <span class="variable">session</span> = <span class="variable">JSON</span>.<span class="function">parse</span>(<span class="variable">savedSession</span>);
                <span class="keyword">const</span> <span class="variable">now</span> = <span class="keyword">new</span> <span class="variable">Date</span>().<span class="function">getTime</span>();
                
                <span class="keyword">if</span> (<span class="variable">session</span>.<span class="variable">expiry</span> > <span class="variable">now</span>) {
                    <span class="keyword">this</span>.<span class="variable">isAuthenticated</span> = <span class="keyword">true</span>;
                    <span class="keyword">this</span>.<span class="variable">currentUser</span> = <span class="variable">session</span>.<span class="variable">user</span>;
                    <span class="keyword">this</span>.<span class="function">showDashboard</span>();
                    <span class="keyword">this</span>.<span class="function">startSessionTimer</span>();
                    <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'✅ Sessão existente válida restaurada'</span>, <span class="string">'success'</span>);
                } <span class="keyword">else</span> {
                    <span class="keyword">this</span>.<span class="function">clearSession</span>();
                    <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'⏰ Sessão expirada removida'</span>, <span class="string">'info'</span>);
                }
            } <span class="keyword">catch</span> (<span class="variable">e</span>) {
                <span class="keyword">this</span>.<span class="function">clearSession</span>();
                <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'❌ Erro ao restaurar sessão'</span>, <span class="string">'error'</span>, <span class="variable">e</span>);
            }
        }
    },

    <span class="comment">/**
     * 🌐 Testar conexão com o servidor
     */</span>
    <span class="keyword">async</span> <span class="function">testConnection</span>() {
        <span class="keyword">const</span> <span class="variable">statusEl</span> = <span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">connectionStatus</span>;
        <span class="keyword">const</span> <span class="variable">progressEl</span> = <span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">connectionProgress</span>;
        
        <span class="keyword">if</span> (!<span class="variable">statusEl</span> || !<span class="variable">progressEl</span>) <span class="keyword">return</span>;

        <span class="keyword">try</span> {
            <span class="variable">statusEl</span>.<span class="variable">textContent</span> = <span class="string">'Testando conexão...'</span>;
            <span class="variable">progressEl</span>.<span class="variable">style</span>.<span class="variable">width</span> = <span class="string">'30%'</span>;
            
            <span class="variable">Performance</span>.<span class="function">start</span>(<span class="string">'Connection Test'</span>);
            
            <span class="keyword">const</span> <span class="variable">response</span> = <span class="keyword">await</span> <span class="function">fetch</span>(<span class="variable">CONFIG</span>.<span class="variable">ENDPOINTS</span>.<span class="variable">LOGIN</span>, {
                <span class="variable">method</span>: <span class="string">'POST'</span>,
                <span class="variable">headers</span>: { <span class="string">'Content-Type'</span>: <span class="string">'application/json'</span> },
                <span class="variable">body</span>: <span class="variable">JSON</span>.<span class="function">stringify</span>({ <span class="variable">test</span>: <span class="keyword">true</span> }),
                <span class="variable">signal</span>: <span class="variable">AbortSignal</span>.<span class="function">timeout</span>(<span class="number">5000</span>)
            });
            
            <span class="variable">Performance</span>.<span class="function">end</span>(<span class="string">'Connection Test'</span>);
            <span class="variable">progressEl</span>.<span class="variable">style</span>.<span class="variable">width</span> = <span class="string">'100%'</span>;
            
            <span class="keyword">if</span> (<span class="variable">response</span>.<span class="variable">ok</span> || <span class="variable">response</span>.<span class="variable">status</span> === <span class="number">400</span>) {
                <span class="variable">statusEl</span>.<span class="variable">textContent</span> = <span class="string">'✅ Conectado'</span>;
                <span class="variable">statusEl</span>.<span class="variable">className</span> = <span class="string">'text-sm font-medium text-green-700'</span>;
                <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'🌐 Conexão com n8n estabelecida'</span>, <span class="string">'success'</span>);
            } <span class="keyword">else</span> {
                <span class="keyword">throw</span> <span class="keyword">new</span> <span class="variable">Error</span>(<span class="string">`Status: ${response.status}`</span>);
            }
        } <span class="keyword">catch</span> (<span class="variable">error</span>) {
            <span class="variable">statusEl</span>.<span class="variable">textContent</span> = <span class="string">'❌ Erro de Conexão'</span>;
            <span class="variable">statusEl</span>.<span class="variable">className</span> = <span class="string">'text-sm font-medium text-red-700'</span>;
            <span class="variable">progressEl</span>.<span class="variable">style</span>.<span class="variable">width</span> = <span class="string">'0%'</span>;
            <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">`❌ Erro de conexão: ${error.message}`</span>, <span class="string">'error'</span>);
        }
    },

    <span class="comment">/**
     * 🔐 Processar login
     */</span>
    <span class="keyword">async</span> <span class="function">handleLogin</span>(<span class="variable">e</span>) {
        <span class="variable">e</span>.<span class="function">preventDefault</span>();
        
        <span class="comment">// Verificar lockout</span>
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="function">isLockedOut</span>()) {
            <span class="keyword">this</span>.<span class="function">showError</span>(<span class="string">'Muitas tentativas. Tente novamente em 5 minutos.'</span>);
            <span class="keyword">return</span>;
        }

        <span class="keyword">const</span> <span class="variable">username</span> = <span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">usernameInput</span>?.<span class="variable">value</span>.<span class="function">trim</span>();
        <span class="keyword">const</span> <span class="variable">password</span> = <span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">passwordInput</span>?.<span class="variable">value</span>;

        <span class="keyword">if</span> (!<span class="keyword">this</span>.<span class="function">validateCredentials</span>(<span class="variable">username</span>, <span class="variable">password</span>)) {
            <span class="keyword">return</span>;
        }

        <span class="variable">Performance</span>.<span class="function">start</span>(<span class="string">'Login'</span>);
        <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">`🔐 Tentativa de login para usuário: ${username}`</span>, <span class="string">'info'</span>);
        
        <span class="variable">UI</span>.<span class="function">showLoader</span>(<span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">loginBtn</span>);
        <span class="keyword">this</span>.<span class="function">clearErrors</span>();
        
        <span class="keyword">try</span> {
            <span class="keyword">const</span> <span class="variable">response</span> = <span class="keyword">await</span> <span class="function">fetch</span>(<span class="variable">CONFIG</span>.<span class="variable">ENDPOINTS</span>.<span class="variable">LOGIN</span>, {
                <span class="variable">method</span>: <span class="string">'POST'</span>,
                <span class="variable">headers</span>: { <span class="string">'Content-Type'</span>: <span class="string">'application/json'</span> },
                <span class="variable">body</span>: <span class="variable">JSON</span>.<span class="function">stringify</span>({ <span class="variable">username</span>, <span class="variable">password</span> }),
                <span class="variable">signal</span>: <span class="variable">AbortSignal</span>.<span class="function">timeout</span>(<span class="variable">CONFIG</span>.<span class="variable">TIMEOUTS</span>.<span class="variable">LOGIN</span>)
            });
            
            <span class="keyword">const</span> <span class="variable">responseText</span> = <span class="keyword">await</span> <span class="variable">response</span>.<span class="function">text</span>();
            <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'📨 Resposta do login recebida'</span>, <span class="string">'info'</span>, { 
                <span class="variable">status</span>: <span class="variable">response</span>.<span class="variable">status</span>, 
                <span class="variable">response</span>: <span class="variable">responseText</span>.<span class="function">substring</span>(<span class="number">0</span>, <span class="number">100</span>) 
            });
            
            <span class="keyword">let</span> <span class="variable">data</span>;
            <span class="keyword">try</span> {
                <span class="variable">data</span> = <span class="variable">JSON</span>.<span class="function">parse</span>(<span class="variable">responseText</span>);
            } <span class="keyword">catch</span> (<span class="variable">e</span>) {
                <span class="keyword">if</span> (<span class="variable">response</span>.<span class="variable">ok</span>) {
                    <span class="variable">data</span> = { <span class="variable">success</span>: <span class="keyword">true</span>, <span class="variable">message</span>: <span class="string">'Login realizado com sucesso'</span> };
                } <span class="keyword">else</span> {
                    <span class="keyword">throw</span> <span class="keyword">new</span> <span class="variable">Error</span>(<span class="string">'Resposta inválida do servidor'</span>);
                }
            }
            
            <span class="keyword">if</span> (!<span class="variable">response</span>.<span class="variable">ok</span> && !<span class="variable">data</span>.<span class="variable">success</span>) {
                <span class="keyword">this</span>.<span class="variable">loginAttempts</span>++;
                <span class="keyword">throw</span> <span class="keyword">new</span> <span class="variable">Error</span>(<span class="variable">data</span>.<span class="variable">message</span> || <span class="string">`Erro ${response.status}`</span>);
            }
            
            <span class="comment">// Login bem-sucedido</span>
            <span class="keyword">this</span>.<span class="function">onLoginSuccess</span>(<span class="variable">username</span>, <span class="variable">data</span>);
            
        } <span class="keyword">catch</span> (<span class="variable">error</span>) {
            <span class="keyword">this</span>.<span class="function">onLoginError</span>(<span class="variable">error</span>);
        } <span class="keyword">finally</span> {
            <span class="variable">Performance</span>.<span class="function">end</span>(<span class="string">'Login'</span>);
            <span class="variable">UI</span>.<span class="function">hideLoader</span>(<span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">loginBtn</span>);
        }
    },

    <span class="comment">/**
     * ✅ Sucesso no login
     */</span>
    <span class="function">onLoginSuccess</span>(<span class="variable">username</span>, <span class="variable">data</span>) {
        <span class="keyword">this</span>.<span class="variable">isAuthenticated</span> = <span class="keyword">true</span>;
        <span class="keyword">this</span>.<span class="variable">currentUser</span> = { <span class="variable">username</span>, <span class="variable">loginTime</span>: <span class="keyword">new</span> <span class="variable">Date</span>() };
        <span class="keyword">this</span>.<span class="variable">loginAttempts</span> = <span class="number">0</span>;
        
        <span class="comment">// Salvar sessão</span>
        <span class="keyword">this</span>.<span class="function">saveSession</span>();
        
        <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'✅ Login realizado com sucesso'</span>, <span class="string">'success'</span>, <span class="variable">data</span>);
        
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">loginSuccess</span>) {
            <span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">loginSuccess</span>.<span class="variable">textContent</span> = <span class="string">'Login bem-sucedido! Carregando dashboard...'</span>;
            <span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">loginSuccess</span>.<span class="variable">classList</span>.<span class="function">remove</span>(<span class="string">'hidden'</span>);
        }
        
        <span class="function">setTimeout</span>(() => <span class="keyword">this</span>.<span class="function">showDashboard</span>(), <span class="number">1500</span>);
    },

    <span class="comment">/**
     * ❌ Erro no login
     */</span>
    <span class="function">onLoginError</span>(<span class="variable">error</span>) {
        <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">`❌ Erro no login: ${error.message}`</span>, <span class="string">'error'</span>);
        <span class="keyword">this</span>.<span class="function">showError</span>(<span class="variable">error</span>.<span class="variable">message</span>);
        
        <span class="comment">// Verificar lockout após erro</span>
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="variable">loginAttempts</span> >= <span class="keyword">this</span>.<span class="variable">maxAttempts</span>) {
            <span class="keyword">this</span>.<span class="function">lockAccount</span>();
        }
    },

    <span class="comment">/**
     * 🏠 Mostrar dashboard
     */</span>
    <span class="function">showDashboard</span>() {
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">loginScreen</span>) {
            <span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">loginScreen</span>.<span class="variable">classList</span>.<span class="function">add</span>(<span class="string">'hidden'</span>);
        }
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">mainDashboard</span>) {
            <span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">mainDashboard</span>.<span class="variable">classList</span>.<span class="function">remove</span>(<span class="string">'hidden'</span>);
        }
        
        <span class="comment">// Atualizar status do sistema</span>
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">systemStatus</span>) {
            <span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">systemStatus</span>.<span class="variable">textContent</span> = <span class="string">'Online'</span>;
            <span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">systemStatus</span>.<span class="variable">className</span> = <span class="string">'px-3 py-1 bg-green-500 text-white text-xs rounded-full'</span>;
        }
        
        <span class="comment">// Inicializar outros sistemas se necessário</span>
        <span class="keyword">if</span> (<span class="keyword">typeof</span> <span class="variable">feather</span> !== <span class="string">'undefined'</span>) <span class="variable">feather</span>.<span class="function">replace</span>();
        <span class="keyword">if</span> (<span class="keyword">typeof</span> <span class="variable">UI</span> !== <span class="string">'undefined'</span>) <span class="variable">UI</span>.<span class="function">updateLastUpdate</span>();
        <span class="keyword">if</span> (<span class="keyword">typeof</span> <span class="variable">Charts</span> !== <span class="string">'undefined'</span>) <span class="variable">Charts</span>.<span class="function">init</span>();
        <span class="keyword">if</span> (<span class="keyword">typeof</span> <span class="variable">FilterManager</span> !== <span class="string">'undefined'</span>) <span class="variable">FilterManager</span>.<span class="function">setupEventListeners</span>();
        
        <span class="keyword">this</span>.<span class="function">startSessionTimer</span>();
        <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'🏠 Dashboard carregado com sucesso'</span>, <span class="string">'success'</span>);
    },

    <span class="comment">/**
     * 🚪 Logout
     */</span>
    <span class="function">logout</span>() {
        <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'🚪 Realizando logout...'</span>, <span class="string">'info'</span>);
        
        <span class="keyword">this</span>.<span class="function">clearSession</span>();
        <span class="keyword">this</span>.<span class="function">resetUI</span>();
        
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">mainDashboard</span>) {
            <span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">mainDashboard</span>.<span class="variable">classList</span>.<span class="function">add</span>(<span class="string">'hidden'</span>);
        }
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">loginScreen</span>) {
            <span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">loginScreen</span>.<span class="variable">classList</span>.<span class="function">remove</span>(<span class="string">'hidden'</span>);
        }
        
        <span class="comment">// Resetar formulário</span>
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">loginForm</span>) {
            <span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">loginForm</span>.<span class="function">reset</span>();
        }
        
        <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'✅ Logout realizado'</span>, <span class="string">'success'</span>);
    },

    <span class="comment">/**
     * 💾 Salvar sessão
     */</span>
    <span class="function">saveSession</span>() {
        <span class="keyword">const</span> <span class="variable">expiry</span> = <span class="keyword">new</span> <span class="variable">Date</span>().<span class="function">getTime</span>() + <span class="keyword">this</span>.<span class="variable">sessionDuration</span>;
        <span class="keyword">const</span> <span class="variable">session</span> = {
            <span class="variable">user</span>: <span class="keyword">this</span>.<span class="variable">currentUser</span>,
            <span class="variable">expiry</span>: <span class="variable">expiry</span>,
            <span class="variable">created</span>: <span class="keyword">new</span> <span class="variable">Date</span>().<span class="function">getTime</span>()
        };
        
        <span class="variable">localStorage</span>.<span class="function">setItem</span>(<span class="string">'mcConsultoriaSession'</span>, <span class="variable">JSON</span>.<span class="function">stringify</span>(<span class="variable">session</span>));
        <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'💾 Sessão salva'</span>, <span class="string">'info'</span>);
    },

    <span class="comment">/**
     * 🗑️ Limpar sessão
     */</span>
    <span class="function">clearSession</span>() {
        <span class="keyword">this</span>.<span class="variable">isAuthenticated</span> = <span class="keyword">false</span>;
        <span class="keyword">this</span>.<span class="variable">currentUser</span> = <span class="keyword">null</span>;
        <span class="variable">localStorage</span>.<span class="function">removeItem</span>(<span class="string">'mcConsultoriaSession'</span>);
        <span class="keyword">this</span>.<span class="function">clearSessionTimer</span>();
    },

    <span class="comment">/**
     * ⏰ Gerenciar timer da sessão
     */</span>
    <span class="function">startSessionTimer</span>() {
        <span class="keyword">this</span>.<span class="function">clearSessionTimer</span>();
        <span class="keyword">this</span>.<span class="variable">sessionTimeout</span> = <span class="function">setTimeout</span>(() => {
            <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'⏰ Sessão expirada por inatividade'</span>, <span class="string">'warning'</span>);
            <span class="keyword">this</span>.<span class="function">logout</span>();
        }, <span class="keyword">this</span>.<span class="variable">sessionDuration</span>);
    },

    <span class="function">resetSessionTimer</span>() {
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="variable">isAuthenticated</span>) {
            <span class="keyword">this</span>.<span class="function">startSessionTimer</span>();
        }
    },

    <span class="function">clearSessionTimer</span>() {
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="variable">sessionTimeout</span>) {
            <span class="function">clearTimeout</span>(<span class="keyword">this</span>.<span class="variable">sessionTimeout</span>);
            <span class="keyword">this</span>.<span class="variable">sessionTimeout</span> = <span class="keyword">null</span>;
        }
    },

    <span class="comment">/**
     * 🔒 Sistema de lockout
     */</span>
    <span class="function">isLockedOut</span>() {
        <span class="keyword">const</span> <span class="variable">lockout</span> = <span class="variable">localStorage</span>.<span class="function">getItem</span>(<span class="string">'loginLockout'</span>);
        <span class="keyword">if</span> (!<span class="variable">lockout</span>) <span class="keyword">return</span> <span class="keyword">false</span>;
        
        <span class="keyword">const</span> <span class="variable">lockTime</span> = <span class="variable">parseInt</span>(<span class="variable">lockout</span>);
        <span class="keyword">const</span> <span class="variable">now</span> = <span class="keyword">new</span> <span class="variable">Date</span>().<span class="function">getTime</span>();
        
        <span class="keyword">if</span> (<span class="variable">now</span> < <span class="variable">lockTime</span>) {
            <span class="keyword">return</span> <span class="keyword">true</span>;
        } <span class="keyword">else</span> {
            <span class="variable">localStorage</span>.<span class="function">removeItem</span>(<span class="string">'loginLockout'</span>);
            <span class="keyword">this</span>.<span class="variable">loginAttempts</span> = <span class="number">0</span>;
            <span class="keyword">return</span> <span class="keyword">false</span>;
        }
    },

    <span class="function">lockAccount</span>() {
        <span class="keyword">const</span> <span class="variable">lockUntil</span> = <span class="keyword">new</span> <span class="variable">Date</span>().<span class="function">getTime</span>() + <span class="keyword">this</span>.<span class="variable">lockoutTime</span>;
        <span class="variable">localStorage</span>.<span class="function">setItem</span>(<span class="string">'loginLockout'</span>, <span class="variable">lockUntil</span>.<span class="function">toString</span>());
        <span class="variable">Debug</span>.<span class="function">log</span>(<span class="string">'🔒 Conta bloqueada por muitas tentativas'</span>, <span class="string">'warning'</span>);
    },

    <span class="comment">/**
     * ✅ Validações
     */</span>
    <span class="function">validateCredentials</span>(<span class="variable">username</span>, <span class="variable">password</span>) {
        <span class="keyword">if</span> (!<span class="variable">username</span>) {
            <span class="keyword">this</span>.<span class="function">showError</span>(<span class="string">'Por favor, digite o usuário'</span>);
            <span class="keyword">return</span> <span class="keyword">false</span>;
        }
        
        <span class="keyword">if</span> (!<span class="variable">password</span>) {
            <span class="keyword">this</span>.<span class="function">showError</span>(<span class="string">'Por favor, digite a senha'</span>);
            <span class="keyword">return</span> <span class="keyword">false</span>;
        }
        
        <span class="keyword">if</span> (<span class="variable">username</span>.<span class="variable">length</span> < <span class="number">3</span>) {
            <span class="keyword">this</span>.<span class="function">showError</span>(<span class="string">'Usuário deve ter pelo menos 3 caracteres'</span>);
            <span class="keyword">return</span> <span class="keyword">false</span>;
        }
        
        <span class="keyword">return</span> <span class="keyword">true</span>;
    },

    <span class="comment">/**
     * 🎨 Interface
     */</span>
    <span class="function">showError</span>(<span class="variable">message</span>) {
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">loginError</span>) {
            <span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">loginError</span>.<span class="variable">textContent</span> = <span class="variable">message</span>;
            <span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">loginError</span>.<span class="variable">classList</span>.<span class="function">remove</span>(<span class="string">'hidden'</span>);
        }
    },

    <span class="function">clearErrors</span>() {
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">loginError</span>) {
            <span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">loginError</span>.<span class="variable">classList</span>.<span class="function">add</span>(<span class="string">'hidden'</span>);
        }
        <span class="keyword">if</span> (<span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">loginSuccess</span>) {
            <span class="keyword">this</span>.<span class="variable">elements</span>.<span class="variable">loginSuccess</span>.<span class="variable">classList</span>.<span class="function">add</span>(<span class="string">'hidden'</span>);
        }
    },

    <span class="function">resetUI</span>() {
        <span class="comment">// Resetar estado da aplicação se disponível</span>
        <span class="keyword">if</span> (<span class="keyword">typeof</span> <span class="variable">AppState</span> !== <span class="string">'undefined'</span>) {
            <span class="variable">AppState</span>.<span class="variable">currentPage</span> = <span class="number">1</span>;
            <span class="variable">AppState</span>.<span class="variable">totalItems</span> = <span class="number">0</span>;
            <span class="variable">AppState</span>.<span class="variable">allResults</span> = [];
            <span class="variable">AppState</span>.<span class="variable">filteredResults</span> = [];
            <span class="variable">AppState</span>.<span class="variable">activeFilters</span> = { <span class="variable">modalidades</span>: [], <span class="variable">tipologias</span>: [] };
        }
        
        <span class="comment">// Ocultar seções se existirem</span>
        [<span class="string">'statsSection'</span>, <span class="string">'chartsSection'</span>, <span class="string">'resultsSection'</span>].<span class="function">forEach</span>(<span class="variable">id</span> => {
            <span class="keyword">const</span> <span class="variable">el</span> = <span class="variable">document</span>.<span class="function">getElementById</span>(<span class="variable">id</span>);
            <span class="keyword">if</span> (<span class="variable">el</span>) <span class="variable">el</span>.<span class="variable">classList</span>.<span class="function">add</span>(<span class="string">'hidden'</span>);
        });
    },

    <span class="comment">/**
     * 📊 Informações da sessão
     */</span>
    <span class="function">getSessionInfo</span>() {
        <span class="keyword">return</span> {
            <span class="variable">isAuthenticated</span>: <span class="keyword">this</span>.<span class="variable">isAuthenticated</span>,
            <span class="variable">currentUser</span>: <span class="keyword">this</span>.<span class="variable">currentUser</span>,
            <span class="variable">loginAttempts</span>: <span class="keyword">this</span>.<span class="variable">loginAttempts</span>,
            <span class="variable">isLockedOut</span>: <span class="keyword">this</span>.<span class="function">isLockedOut</span>()
        };
    }
};

<span class="comment">// Tornar disponível globalmente</span>
<span class="keyword">if</span> (<span class="keyword">typeof</span> <span class="variable">window</span> !== <span class="string">'undefined'</span>) {
    <span class="variable">window</span>.<span class="variable">Auth</span> = <span class="variable">Auth</span>;
    
    <span class="comment">// Funções globais para compatibilidade</span>
    <span class="variable">window</span>.<span class="variable">logout</span> = () => <span class="variable">Auth</span>.<span class="function">logout</span>();
    <span class="variable">window</span>.<span class="variable">handleLogin</span> = (<span class="variable">e</span>) => <span class="variable">Auth</span>.<span class="function">handleLogin</span>(<span class="variable">e</span>);
}

<span class="comment">// Auto-inicialização quando DOM estiver pronto</span>
<span class="keyword">if</span> (<span class="variable">document</span>.<span class="variable">readyState</span> === <span class="string">'loading'</span>) {
    <span class="variable">document</span>.<span class="function">addEventListener</span>(<span class="string">'DOMContentLoaded'</span>, () => <span class="variable">Auth</span>.<span class="function">init</span>());
} <span class="keyword">else</span> {
    <span class="variable">Auth</span>.<span class="function">init</span>();
}</pre>
            </div>
        </div>

        <!-- Documentação -->
        <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 class="text-lg font-semibold mb-4">📚 Funcionalidades do Sistema de Autenticação</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 class="font-medium text-gray-800 mb-2">🔐 Autenticação</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                        <li>• Login com validação de credenciais</li>
                        <li>• Sistema anti-força bruta (lockout)</li>
                        <li>• Timeout de requisições configurável</li>
                        <li>• Validação em tempo real</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-medium text-gray-800 mb-2">🛡️ Sessão</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                        <li>• Persistência automática no localStorage</li>
                        <li>• Auto-logout por inatividade</li>
                        <li>• Restauração de sessão válida</li>
                        <li>• Timer de expiração configurável</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-medium text-gray-800 mb-2">🌐 Conexão</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                        <li>• Teste automático de conectividade</li>
                        <li>• Status visual da conexão</li>
                        <li>• Progress bar de carregamento</li>
                        <li>• Tratamento de timeouts</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-medium text-gray-800 mb-2">🎨 Interface</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                        <li>• Feedback visual de loading</li>
                        <li>• Mensagens de erro e sucesso</li>
                        <li>• Transições suaves entre telas</li>
                        <li>• Reset automático do estado</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Como Usar -->
        <div class="bg-blue-50 rounded-lg p-6 mt-6">
            <h3 class="text-lg font-semibold text-blue-800 mb-4">🚀 Como Integrar</h3>
            <div class="space-y-4">
                <div>
                    <h4 class="font-medium text-blue-700 mb-2">1. Incluir o arquivo:</h4>
                    <code class="bg-white p-2 rounded text-sm block">&lt;script src="assets/js/05-auth.js"&gt;&lt;/script&gt;</code>
                </div>
                <div>
                    <h4 class="font-medium text-blue-700 mb-2">2. Usar as funções:</h4>
                    <code class="bg-white p-2 rounded text-sm block">
                        Auth.login(username, password);<br>
                        Auth.logout();<br>
                        Auth.getSessionInfo();
                    </code>
                </div>
                <div>
                    <h4 class="font-medium text-blue-700 mb-2">3. Elementos HTML necessários:</h4>
                    <div class="text-sm text-blue-600 space-y-1">
                        <div>• #loginScreen, #mainDashboard, #loginForm</div>
                        <div>• #username, #password, #loginBtn</div>
                        <div>• #loginError, #loginSuccess</div>
                        <div>• #connectionStatus, #connectionProgress</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function copyCode() {
            const code = document.getElementById('codeContent').textContent;
            navigator.clipboard.writeText(code).then(() => {
                alert('Código copiado para a área de transferência!');
            });
        }
    </script>
</body>
</html>
