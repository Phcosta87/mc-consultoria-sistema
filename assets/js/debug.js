// =====================================
// 🐛 SISTEMA DE DEBUG AVANÇADO
// MC Consultoria - Sistema de Licitações
// =====================================

const Debug = {
    logs: [],
    isVisible: false,
    
    // Log principal com categorização
    log(message, type = 'info', data = null) {
        if (!CONFIG.DEBUG.CONSOLE_OUTPUT) return;
        
        const timestamp = new Date().toLocaleTimeString('pt-BR');
        const logEntry = { 
            timestamp, 
            message, 
            type, 
            data: data ? this.formatData(data) : null,
            id: Date.now() + Math.random()
        };
        
        this.logs.push(logEntry);
        
        // Limitar número de logs
        if (this.logs.length > CONFIG.DEBUG.MAX_LOGS) {
            this.logs = this.logs.slice(-Math.floor(CONFIG.DEBUG.MAX_LOGS * 0.5));
        }
        
        this.updateDebugPanel();
        this.consoleOutput(logEntry);
    },
    
    // Formatar dados para exibição
    formatData(data) {
        try {
            if (typeof data === 'object') {
                return JSON.stringify(data, null, 2);
            }
            return String(data);
        } catch (e) {
            return '[Objeto não serializável]';
        }
    },
    
    // Output no console do navegador
    consoleOutput(logEntry) {
        const consoleMethod = logEntry.type === 'error' ? 'error' : 
                             logEntry.type === 'warning' ? 'warn' : 'log';
        
        const prefix = `[${logEntry.timestamp}] MC Consultoria:`;
        
        if (logEntry.data) {
            console[consoleMethod](prefix, logEntry.message, '\n', logEntry.data);
        } else {
            console[consoleMethod](prefix, logEntry.message);
        }
    },
    
    // Atualizar painel visual de debug
    updateDebugPanel() {
        const debugLog = document.getElementById('debugLog');
        if (!debugLog) return;
        
        const visibleLogs = this.logs.slice(-CONFIG.DEBUG.VISIBLE_LOGS);
        
        debugLog.innerHTML = visibleLogs.map(log => 
            `<div class="debug-log debug-${log.type}">
                <strong>[${log.timestamp}]</strong> ${this.escapeHtml(log.message)}
                ${log.data ? `<br><small><pre>${this.escapeHtml(log.data)}</pre></small>` : ''}
            </div>`
        ).join('');
        
        debugLog.scrollTop = debugLog.scrollHeight;
        this.updateDebugStats();
    },
    
    // Estatísticas do debug
    updateDebugStats() {
        const stats = this.getDebugStats();
        const statsEl = document.getElementById('debugStats');
        
        if (statsEl) {
            statsEl.innerHTML = `
                <div class="debug-stat">
                    <div class="debug-stat-value">${stats.total}</div>
                    <div class="debug-stat-label">Total</div>
                </div>
                <div class="debug-stat">
                    <div class="debug-stat-value">${stats.errors}</div>
                    <div class="debug-stat-label">Erros</div>
                </div>
                <div class="debug-stat">
                    <div class="debug-stat-value">${stats.warnings}</div>
                    <div class="debug-stat-label">Avisos</div>
                </div>
                <div class="debug-stat">
                    <div class="debug-stat-value">${stats.success}</div>
                    <div class="debug-stat-label">Sucesso</div>
                </div>
            `;
        }
    },
    
    // Obter estatísticas dos logs
    getDebugStats() {
        return {
            total: this.logs.length,
            errors: this.logs.filter(log => log.type === 'error').length,
            warnings: this.logs.filter(log => log.type === 'warning').length,
            success: this.logs.filter(log => log.type === 'success').length,
            info: this.logs.filter(log => log.type === 'info').length
        };
    },
    
    // Escape HTML para segurança
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    // Métodos de conveniência
    error(message, data = null) {
        this.log(message, 'error', data);
    },
    
    warning(message, data = null) {
        this.log(message, 'warning', data);
    },
    
    success(message, data = null) {
        this.log(message, 'success', data);
    },
    
    info(message, data = null) {
        this.log(message, 'info', data);
    },
    
    // Limpar logs
    clear() {
        this.logs = [];
        this.updateDebugPanel();
        console.clear();
        this.info('Debug logs limpos');
    },
    
    // Toggle visibilidade do painel
    toggle() {
        this.isVisible = !this.isVisible;
        const panel = document.getElementById('debugPanel');
        
        if (panel) {
            if (this.isVisible) {
                panel.classList.remove('hidden');
                this.info('Debug panel aberto');
            } else {
                panel.classList.add('hidden');
                this.info('Debug panel fechado');
            }
        }
    },
    
    // Teste completo de filtros
    testarFiltrosCompleto() {
        this.log('🧪 === TESTE COMPLETO DOS FILTROS MÚLTIPLOS ===', 'success');
        
        try {
            // Verificar se FilterManager está disponível
            if (typeof FilterManager === 'undefined') {
                this.error('FilterManager não encontrado');
                return;
            }
            
            // Sincronizar estado
            FilterManager.syncState();
            
            // Capturar dados dos checkboxes
            const modalidadeCheckboxes = document.querySelectorAll('input[name="modalidade"]:checked');
            const tipologiaCheckboxes = document.querySelectorAll('input[name="tipologia"]:checked');
            
            const modalidadesFromDom = Array.from(modalidadeCheckboxes).map(cb => cb.value);
            const tipologiasFromDom = Array.from(tipologiaCheckboxes).map(cb => cb.value);
            
            // Comparar com estado da aplicação
            const comparison = {
                DOM: {
                    modalidades: modalidadesFromDom,
                    tipologias: tipologiasFromDom,
                    totalModalidades: modalidadesFromDom.length,
                    totalTipologias: tipologiasFromDom.length
                },
                Estado: {
                    modalidades: AppState?.activeFilters?.modalidades || [],
                    tipologias: AppState?.activeFilters?.tipologias || [],
                    totalModalidades: AppState?.activeFilters?.modalidades?.length || 0,
                    totalTipologias: AppState?.activeFilters?.tipologias?.length || 0
                }
            };
            
            this.log('📊 COMPARAÇÃO COMPLETA:', 'info', comparison);
            
            // Testar função getFilters se disponível
            if (typeof Search !== 'undefined' && Search.getFilters) {
                const filtros = Search.getFilters();
                this.log('🎯 RESULTADO DA FUNÇÃO getFilters():', 'success', filtros);
                
                // Verificar múltiplos filtros
                if (filtros.modalidades && filtros.modalidades.length > 1) {
                    this.log('✅ MÚLTIPLAS MODALIDADES DETECTADAS CORRETAMENTE!', 'success', filtros.modalidades);
                }
                
                if (filtros.tipologias && filtros.tipologias.length > 1) {
                    this.log('✅ MÚLTIPLAS TIPOLOGIAS DETECTADAS CORRETAMENTE!', 'success', filtros.tipologias);
                }
                
                return {
                    dom: { modalidades: modalidadesFromDom, tipologias: tipologiasFromDom },
                    estado: AppState?.activeFilters || {},
                    filtros: filtros,
                    comparison: comparison
                };
            }
            
        } catch (error) {
            this.error('Erro durante teste de filtros:', error.message);
        }
    },
    
    // Monitorar performance
    monitorPerformance(operationName, startTime) {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        let level = 'success';
        if (duration > CONFIG.PERFORMANCE.BAD_THRESHOLD) {
            level = 'error';
        } else if (duration > CONFIG.PERFORMANCE.MEDIUM_THRESHOLD) {
            level = 'warning';
        }
        
        this.log(`⚡ Performance ${operationName}: ${duration.toFixed(2)}ms`, level);
        return duration;
    },
    
    // Exportar logs
    exportLogs() {
        const dataStr = JSON.stringify(this.logs, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `debug-logs-${new Date().toISOString().slice(0,10)}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.success('Logs exportados com sucesso');
    }
};

// Funções globais para facilitar uso
window.Debug = Debug;
window.debugLog = (msg, type, data) => Debug.log(msg, type, data);
window.debugError = (msg, data) => Debug.error(msg, data);
window.debugSuccess = (msg, data) => Debug.success(msg, data);
window.debugClear = () => Debug.clear();
window.toggleDebug = () => Debug.toggle();
window.clearDebugLog = () => Debug.clear();
window.testarFiltrosCompleto = () => Debug.testarFiltrosCompleto();

console.log('✅ DEBUG: Sistema de debug carregado');
