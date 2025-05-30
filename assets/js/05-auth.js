// =====================================
// 🔐 SISTEMA DE AUTENTICAÇÃO
// MC Consultoria - Sistema de Licitações
// =====================================

const Auth = {
    isAuthenticated: false,
    currentUser: null,
    loginAttempts: 0,
    maxAttempts: 5,
    
    // Realizar login
    async login(username, password) {
        Performance.start('Login');
        Debug.log(`Tentativa de login para usuário: ${username}`, 'info');
        
        // Verificar tentativas de login
        if (this.loginAttempts >= this.maxAttempts) {
            const errorMsg = 'Muitas tentativas de login. Tente novamente em alguns minutos.';
            UI.showError('loginError', errorMsg);
            Debug.error('Login bloqueado por excesso de tentativas');
            return false;
        }
        
        UI.showLoader('loginBtn');
        UI.hideError('loginError');
        UI.hideError('loginSuccess');
        
        try {
            // Fazer requisição para N8N
            const response = await this.makeLoginRequest(username, password);
            const responseText = await response.text();
            
            Debug.log('Resposta do login recebida', 'info', { 
                status: response.status, 
                response: responseText.substring(0, 200) + '...' 
            });
            
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                // Se não conseguir fazer parse, mas response.ok, considerar sucesso
                if (response.ok) {
                    data = { success: true, message: 'Login realizado com sucesso' };
                } else {
                    throw new Error('Resposta inválida do servidor');
                }
            }
            
            // Verificar se login foi bem-sucedido
            if (!response.ok && !data.success) {
                this.loginAttempts++;
                throw new Error(data.message || `Erro ${response.status}: Credenciais inválidas`);
            }
            
            // Login bem-sucedido
            this.handleLoginSuccess(username, data);
            
            const duration = Performance.end('Login');
            Debug.log('Login realizado com sucesso', 'success', {
                usuario: username,
                tempo: `${duration.toFixed(2)}ms`,
                resposta: data
            });
            
            return true;
            
        } catch (error) {
            this.handleLoginError(error);
            Performance.end('Login');
            return false;
        } finally {
            UI.hideLoader('loginBtn');
        }
    },
    
    // Fazer requisição de login
    async makeLoginRequest(username, password) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.TIMEOUTS.LOGIN);
        
        try {
            const response = await fetch(CONFIG.ENDPOINTS.LOGIN, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            return response;
            
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error(`Timeout: Login demorou mais que ${CONFIG.TIMEOUTS.LOGIN/1000}s`);
            }
            throw new Error(`Erro de conexão: ${error.message}`);
        }
    },
    
    // Tratar sucesso do login
    handleLoginSuccess(username, data) {
        this.isAuthenticated = true;
        this.currentUser = {
            username: username,
            loginTime: new Date().toISOString(),
            sessionId: this.generateSessionId()
        };
        this.loginAttempts = 0; // Reset tentativas
        
        // Salvar sessão localmente (opcional)
        if (typeof Storage !== 'undefined') {
            localStorage.setItem('mc_auth_session', JSON.stringify({
                username: username,
                loginTime: this.currentUser.loginTime,
                sessionId: this.currentUser.sessionId
            }));
        }
        
        UI.showSuccess('loginSuccess', 'Login bem-sucedido! Carregando dashboard...');
        
        // Aguardar um pouco antes de mostrar dashboard
        setTimeout(() => {
            this.showDashboard();
        }, 1500);
    },
    
    // Tratar erro do login
    handleLoginError(error) {
        Debug.error(`Erro no login: ${error.message}`, error);
        UI.showError('loginError', error.message);
        
        // Adicionar animação de erro
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.classList.add('shake');
            setTimeout(() => {
                loginForm.classList.remove('shake');
            }, 820);
        }
    },
    
    // Mostrar dashboard após login
    showDashboard() {
        UI.elements.loginScreen.classList.add('hidden');
        UI.elements.mainDashboard.classList.remove('hidden');
        
        // Inicializar ícones Feather
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
        
        // Atualizar última atualização
        UI.updateLastUpdate();
        
        // Inicializar gráficos se disponível
        if (typeof Charts !== 'undefined') {
            Charts.init();
        }
        
        // Configurar event listeners de filtros se disponível
        if (typeof FilterManager !== 'undefined') {
            FilterManager.setupEventListeners();
        }
        
        // Atualizar status do sistema
        UI.updateSystemStatus('Online', 'Sistema funcionando normalmente');
        
        Debug.log('Dashboard carregado com sucesso', 'success', this.currentUser);
        
        // Marcar performance
        Performance.mark('dashboard-loaded');
    },
    
    // Fazer logout
    logout() {
        Debug.log('Realizando logout', 'info');
        
        // Limpar estado de autenticação
        this.isAuthenticated = false;
        this.currentUser = null;
        
        // Limpar localStorage
        if (typeof Storage !== 'undefined') {
            localStorage.removeItem('mc_auth_session');
        }
        
        // Voltar para tela de login
        UI.elements.mainDashboard.classList.add('hidden');
        UI.elements.loginScreen.classList.remove('hidden');
        
        // Limpar formulário
        UI.clearForm('loginForm');
        
        // Reset estado da aplicação se disponível
        if (typeof AppState !== 'undefined') {
            this.resetAppState();
        }
        
        // Esconder seções
        UI.hideSection('statsSection');
        UI.hideSection('chartsSection');
        UI.hideSection('resultsSection');
        
        // Atualizar status
        UI.updateSystemStatus('Offline', 'Usuário desconectado');
        
        Debug.log('Logout realizado com sucesso', 'success');
    },
    
    // Reset do estado da aplicação
    resetAppState() {
        if (typeof AppState !== 'undefined') {
            AppState.currentPage = 1;
            AppState.totalItems = 0;
            AppState.allResults = [];
            AppState.filteredResults = [];
            AppState.activeFilters = { modalidades: [], tipologias: [] };
            AppState.searchInProgress = false;
        }
    },
    
    // Gerar ID de sessão
    generateSessionId() {
        return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },
    
    // Verificar se está autenticado
    isLoggedIn() {
        return this.isAuthenticated;
    },
    
    // Obter usuário atual
    getCurrentUser() {
        return this.currentUser;
    },
    
    // Verificar sessão salva
    checkSavedSession() {
        if (typeof Storage === 'undefined') return false;
        
        try {
            const savedSession = localStorage.getItem('mc_auth_session');
            if (savedSession) {
                const session = JSON.parse(savedSession);
                const loginTime = new Date(session.loginTime);
                const now = new Date();
                const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
                
                // Sessão válida por 8 horas
                if (hoursDiff < 8) {
                    Debug.log('Sessão válida encontrada', 'info', session);
                    return session;
                }
            }
        } catch (error) {
            Debug.warning('Erro ao verificar sessão salva:', error.message);
        }
        
        return false;
    },
    
    // Restaurar sessão
    restoreSession(session) {
        this.isAuthenticated = true;
        this.currentUser = {
            username: session.username,
            loginTime: session.loginTime,
            sessionId: session.sessionId
        };
        
        Debug.log('Sessão restaurada', 'success', this.currentUser);
        return true;
    },
    
    // Auto-login se sessão válida
    autoLogin() {
        const savedSession = this.checkSavedSession();
        if (savedSession) {
            if (this.restoreSession(savedSession)) {
                this.showDashboard();
                return true;
            }
        }
        return false;
    },
    
    // Middleware para verificar autenticação
    requireAuth(callback) {
        if (this.isLoggedIn()) {
            callback();
        } else {
            Debug.warning('Operação requer autenticação');
            UI.showError('loginError', 'Você precisa estar logado para realizar esta ação');
        }
    }
};

// Função global para login
window.handleLogin = async function(event) {
    event.preventDefault();
    const username = document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;
    
    if (!username || !password) {
        UI.showError('loginError', 'Por favor, preencha usuário e senha');
        return;
    }
    
    await Auth.login(username, password);
};

// Função global para logout
window.logout = function() {
    Auth.logout();
};

// Disponibilizar globalmente
window.Auth = Auth;

console.log('✅ AUTH: Sistema de autenticação carregado');
