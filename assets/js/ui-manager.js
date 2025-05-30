// =====================================
// 🎨 GERENCIADOR DE INTERFACE
// MC Consultoria - Sistema de Licitações
// =====================================

const UI = {
    elements: {},
    
    // Inicializar elementos da interface
    init() {
        this.elements = {
            // Tela de Login
            loginScreen: document.getElementById('loginScreen'),
            mainDashboard: document.getElementById('mainDashboard'),
            loginForm: document.getElementById('loginForm'),
            loginError: document.getElementById('loginError'),
            loginSuccess: document.getElementById('loginSuccess'),
            loginBtn: document.getElementById('loginBtn'),
            loginText: document.getElementById('loginText'),
            loginLoader: document.getElementById('loginLoader'),
            
            // Botões de Pesquisa
            searchBtn: document.getElementById('searchBtn'),
            searchText: document.getElementById('searchText'),
            searchLoader: document.getElementById('searchLoader'),
            
            // Tabela de Resultados
            resultsTableBody: document.getElementById('resultsTableBody'),
            paginationSection: document.getElementById('paginationSection'),
            resultsCount: document.getElementById('resultsCount'),
            
            // Seções Principais
            statsSection: document.getElementById('statsSection'),
            chartsSection: document.getElementById('chartsSection'),
            resultsSection: document.getElementById('resultsSection'),
            
            // Estatísticas Rápidas
            quickTotal: document.getElementById('quickTotal'),
            quickValue: document.getElementById('quickValue'),
            queryTime: document.getElementById('queryTime'),
            activeFilters: document.getElementById('activeFilters'),
            
            // Outros Elementos
            lastUpdate: document.getElementById('lastUpdate'),
            systemStatus: document.getElementById('systemStatus')
        };
        
        Debug.log('Interface inicializada', 'success');
        return this.elements;
    },
    
    // Mostrar loader em botão
    showLoader(buttonElement, text = null) {
        const btn = typeof buttonElement === 'string' ? 
            document.getElementById(buttonElement) : buttonElement;
        
        if (!btn) return;
        
        const textEl = btn.querySelector('[id$="Text"]');
        const loaderEl = btn.querySelector('[id$="Loader"]');
        
        if (textEl) textEl.classList.add('hidden');
        if (loaderEl) loaderEl.classList.remove('hidden');
        
        btn.disabled = true;
        btn.style.cursor = 'not-allowed';
        
        if (text && textEl) textEl.textContent = text;
        
        Debug.log(`Loader ativado para botão: ${btn.id || 'unknown'}`, 'info');
    },
    
    // Esconder loader em botão
    hideLoader(buttonElement) {
        const btn = typeof buttonElement === 'string' ? 
            document.getElementById(buttonElement) : buttonElement;
        
        if (!btn) return;
        
        const textEl = btn.querySelector('[id$="Text"]');
        const loaderEl = btn.querySelector('[id$="Loader"]');
        
        if (textEl) textEl.classList.remove('hidden');
        if (loaderEl) loaderEl.classList.add('hidden');
        
        btn.disabled = false;
        btn.style.cursor = 'pointer';
        
        Debug.log(`Loader desativado para botão: ${btn.id || 'unknown'}`, 'info');
    },
    
    // Mostrar mensagem de erro
    showError(elementId, message) {
        const el = document.getElementById(elementId);
        if (el) {
            el.textContent = message;
            el.classList.remove('hidden');
            
            // Auto-hide após tempo configurado
            setTimeout(() => {
                this.hideError(elementId);
            }, CONFIG.UI.ERROR_MESSAGE_DURATION);
        }
        Debug.log(`Erro mostrado: ${message}`, 'error');
    },
    
    // Esconder mensagem de erro
    hideError(elementId) {
        const el = document.getElementById(elementId);
        if (el) el.classList.add('hidden');
    },
    
    // Mostrar mensagem de sucesso
    showSuccess(elementId, message) {
        const el = document.getElementById(elementId);
        if (el) {
            el.textContent = message;
            el.classList.remove('hidden');
            
            // Auto-hide após tempo configurado
            setTimeout(() => {
                el.classList.add('hidden');
            }, CONFIG.UI.SUCCESS_MESSAGE_DURATION);
        }
        Debug.log(`Sucesso mostrado: ${message}`, 'success');
    },
    
    // Atualizar estatísticas rápidas no header
    updateQuickStats(total, value, time, filters = 0) {
        if (this.elements.quickTotal) {
            this.elements.quickTotal.textContent = this.formatNumber(total || 0);
        }
        if (this.elements.quickValue) {
            this.elements.quickValue.textContent = this.formatCurrency(value || 0);
        }
        if (this.elements.queryTime) {
            this.elements.queryTime.textContent = `${time || 0}ms`;
        }
        if (this.elements.activeFilters) {
            this.elements.activeFilters.textContent = filters || 0;
        }
        
        Debug.log('Estatísticas rápidas atualizadas', 'info', {
            total, valor: value, tempo: time, filtros: filters
        });
    },
    
    // Atualizar última atualização
    updateLastUpdate() {
        if (this.elements.lastUpdate) {
            const now = new Date().toLocaleTimeString('pt-BR');
            this.elements.lastUpdate.textContent = `Última atualização: ${now}`;
        }
    },
    
    // Formatar moeda brasileira
    formatCurrency(value) {
        if (!value || isNaN(value)) return 'R$ 0,00';
        
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    },
    
    // Formatar números
    formatNumber(value) {
        if (!value || isNaN(value)) return '0';
        
        return new Intl.NumberFormat('pt-BR').format(value);
    },
    
    // Formatar data brasileira
    formatDate(dateString) {
        if (!dateString) return '-';
        
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('pt-BR');
        } catch (e) {
            return dateString;
        }
    },
    
    // Atualizar contadores de filtros
    updateFilterCounters() {
        if (typeof AppState === 'undefined') return;
        
        const modalidades = AppState.activeFilters?.modalidades?.length || 0;
        const tipologias = AppState.activeFilters?.tipologias?.length || 0;
        const total = modalidades + tipologias;
        
        // Atualizar contadores individuais
        const modalidadeCounter = document.getElementById('modalidadeCounter');
        const tipologiaCounter = document.getElementById('tipologiaCounter');
        
        if (modalidadeCounter) {
            if (modalidades > 0) {
                modalidadeCounter.textContent = modalidades;
                modalidadeCounter.classList.remove('hidden');
            } else {
                modalidadeCounter.classList.add('hidden');
            }
        }
        
        if (tipologiaCounter) {
            if (tipologias > 0) {
                tipologiaCounter.textContent = tipologias;
                tipologiaCounter.classList.remove('hidden');
            } else {
                tipologiaCounter.classList.add('hidden');
            }
        }
        
        // Atualizar badge geral
        const filtersBadge = document.getElementById('filtersBadge');
        
        if (filtersBadge) {
            if (total > 0) {
                filtersBadge.textContent = `${total} ativos`;
                filtersBadge.classList.remove('hidden');
            } else {
                filtersBadge.classList.add('hidden');
            }
        }
        
        // Atualizar texto do botão de pesquisa
        if (this.elements.searchText) {
            if (total > 0) {
                this.elements.searchText.textContent = `Pesquisar (${total} filtros)`;
            } else {
                this.elements.searchText.textContent = 'Pesquisar Licitações';
            }
        }
        
        // Atualizar contador rápido
        this.updateQuickStats(
            AppState.totalItems || 0,
            0, // valor será atualizado pela busca
            AppState.lastSearchTime || 0,
            total
        );
        
        Debug.log('Contadores de filtros atualizados', 'info', {
            modalidades, tipologias, total
        });
    },
    
    // Mostrar/esconder seções
    showSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.remove('hidden');
            section.classList.add('fade-in');
        }
    },
    
    hideSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('hidden');
        }
    },
    
    // Toggle de seções
    toggleSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.toggle('hidden');
        }
    },
    
    // Animar elemento
    animate(element, animationClass, duration = 600) {
        const el = typeof element === 'string' ? 
            document.getElementById(element) : element;
        
        if (!el) return;
        
        el.classList.add(animationClass);
        
        setTimeout(() => {
            el.classList.remove(animationClass);
        }, duration);
    },
    
    // Scroll suave para elemento
    scrollTo(elementId, offset = 0) {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    },
    
    // Notificação toast
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${this.getNotificationClasses(type)}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.classList.add('opacity-100', 'translate-x-0');
        }, 100);
        
        // Remover após duração
        setTimeout(() => {
            notification.classList.add('opacity-0', 'translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, duration);
    },
    
    // Classes para notificações
    getNotificationClasses(type) {
        const classes = {
            info: 'bg-blue-500 text-white',
            success: 'bg-green-500 text-white',
            warning: 'bg-yellow-500 text-black',
            error: 'bg-red-500 text-white'
        };
        return classes[type] || classes.info;
    },
    
    // Atualizar status do sistema
    updateSystemStatus(status, message = '') {
        if (this.elements.systemStatus) {
            this.elements.systemStatus.textContent = status;
            this.elements.systemStatus.className = `px-3 py-1 text-xs rounded-full ${this.getStatusClasses(status)}`;
            
            if (message) {
                this.elements.systemStatus.title = message;
            }
        }
    },
    
    // Classes para status do sistema
    getStatusClasses(status) {
        const classes = {
            'Online': 'bg-green-500 text-white',
            'Conectando': 'bg-yellow-500 text-black',
            'Offline': 'bg-red-500 text-white',
            'Erro': 'bg-red-500 text-white'
        };
        return classes[status] || 'bg-gray-500 text-white';
    },
    
    // Limpar formulários
    clearForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.reset();
            // Limpar também campos customizados
            form.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
            });
        }
    }
};

// Disponibilizar globalmente
window.UI = UI;

console.log('✅ UI: Gerenciador de interface carregado');
