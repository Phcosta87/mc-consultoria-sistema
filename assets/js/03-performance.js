// =====================================
// ⚡ SISTEMA DE PERFORMANCE
// MC Consultoria - Sistema de Licitações
// =====================================

const Performance = {
    startTime: 0,
    operations: new Map(),
    metrics: {
        totalOperations: 0,
        averageTime: 0,
        slowestOperation: { name: '', duration: 0 },
        fastestOperation: { name: '', duration: Infinity }
    },
    
    // Iniciar medição de performance
    start(operationName) {
        const startTime = performance.now();
        this.operations.set(operationName, { startTime, name: operationName });
        this.startTime = startTime;
        
        if (typeof Debug !== 'undefined') {
            Debug.log(`🚀 Iniciando operação: ${operationName}`, 'info');
        }
        
        return startTime;
    },
    
    // Finalizar medição de performance
    end(operationName) {
        const endTime = performance.now();
        const operation = this.operations.get(operationName);
        
        if (!operation) {
            console.warn(`Performance: Operação '${operationName}' não foi iniciada`);
            return 0;
        }
        
        const duration = endTime - operation.startTime;
        this.operations.delete(operationName);
        
        // Atualizar métricas
        this.updateMetrics(operationName, duration);
        
        // Log do resultado
        if (typeof Debug !== 'undefined') {
            Debug.log(`✅ Operação concluída: ${operationName} em ${duration.toFixed(2)}ms`, 'success');
        }
        
        // Atualizar badge visual
        this.updatePerformanceBadge(duration);
        
        // Atualizar estatísticas rápidas
        this.updateQuickStats(operationName, duration);
        
        return duration;
    },
    
    // Atualizar métricas globais
    updateMetrics(operationName, duration) {
        this.metrics.totalOperations++;
        
        // Calcular nova média
        const totalTime = (this.metrics.averageTime * (this.metrics.totalOperations - 1)) + duration;
        this.metrics.averageTime = totalTime / this.metrics.totalOperations;
        
        // Atualizar operação mais lenta
        if (duration > this.metrics.slowestOperation.duration) {
            this.metrics.slowestOperation = { name: operationName, duration };
        }
        
        // Atualizar operação mais rápida
        if (duration < this.metrics.fastestOperation.duration) {
            this.metrics.fastestOperation = { name: operationName, duration };
        }
        
        // Log detalhado se debug ativo
        if (typeof Debug !== 'undefined' && CONFIG.DEBUG.PERFORMANCE_MONITORING) {
            Debug.log(`📊 Métricas atualizadas`, 'info', {
                operacao: operationName,
                duracao: `${duration.toFixed(2)}ms`,
                mediaGeral: `${this.metrics.averageTime.toFixed(2)}ms`,
                totalOperacoes: this.metrics.totalOperations
            });
        }
    },
    
    // Atualizar badge visual de performance
    updatePerformanceBadge(duration) {
        const badge = document.getElementById('performanceBadge');
        if (!badge) return;
        
        badge.classList.remove('hidden');
        
        let className, text, emoji;
        
       // SUBSTITUA POR ESTA VERSÃO CORRIGIDA:
if (duration < CONFIG.GOOD_THRESHOLD) {
    className = 'performance-good';
    text = `Ótima (${duration.toFixed(0)}ms)`;
    emoji = '⚡';
} else if (duration < CONFIG.WARNING_THRESHOLD) {
    className = 'performance-medium';
    text = `Média (${(duration/1000).toFixed(1)}s)`;
    emoji = '⚠️';
} else {
    className = 'performance-bad';
    text = `Lenta (${(duration/1000).toFixed(1)}s)`;
    emoji = '🐌';
}
        
        badge.className = `performance-badge ${className}`;
        badge.textContent = `${emoji} Performance: ${text}`;
        
        // Auto-hide após 5 segundos se performance boa
        if (duration < CONFIG.GOOD_THRESHOLD) {
            setTimeout(() => {
                if (badge.classList.contains('performance-good')) {
                    badge.classList.add('hidden');
                }
            }, 5000);
        }
    },
    
    // Atualizar estatísticas rápidas no header
    updateQuickStats(operationName, duration) {
        const queryTimeEl = document.getElementById('queryTime');
        if (queryTimeEl) {
            queryTimeEl.textContent = `${Math.round(duration)}ms`;
            
            // Adicionar classe de cor baseada na performance
            queryTimeEl.className = '';
            if (duration < CONFIG.GOOD_THRESHOLD) {
    queryTimeEl.classList.add('text-green-600');
} else if (duration < CONFIG.WARNING_THRESHOLD) {
    queryTimeEl.classList.add('text-yellow-600');
} else {
    queryTimeEl.classList.add('text-red-600');
}
        }
        
        // Atualizar tempo detalhado se disponível
        const queryTimeDetailEl = document.getElementById('queryTimeDetail');
        if (queryTimeDetailEl) {
            queryTimeDetailEl.textContent = `${Math.round(duration)}ms`;
        }
    },
    
    // Medir função automaticamente
    measure(operationName, fn) {
        const startTime = this.start(operationName);
        
        try {
            const result = fn();
            
            // Se for uma Promise, aguardar resolução
            if (result && typeof result.then === 'function') {
                return result.finally(() => {
                    this.end(operationName);
                });
            } else {
                this.end(operationName);
                return result;
            }
        } catch (error) {
            this.end(operationName);
            if (typeof Debug !== 'undefined') {
                Debug.error(`Erro durante operação ${operationName}:`, error.message);
            }
            throw error;
        }
    },
    
    // Medir função assíncrona
    async measureAsync(operationName, asyncFn) {
        const startTime = this.start(operationName);
        
        try {
            const result = await asyncFn();
            this.end(operationName);
            return result;
        } catch (error) {
            this.end(operationName);
            if (typeof Debug !== 'undefined') {
                Debug.error(`Erro durante operação assíncrona ${operationName}:`, error.message);
            }
            throw error;
        }
    },
    
    // Obter relatório de performance
    getReport() {
        return {
            metrics: { ...this.metrics },
            operacoesAtivas: Array.from(this.operations.keys()),
            timestamp: new Date().toISOString(),
            navegador: {
                userAgent: navigator.userAgent,
                conexao: navigator.connection ? {
                    effectiveType: navigator.connection.effectiveType,
                    downlink: navigator.connection.downlink,
                    rtt: navigator.connection.rtt
                } : 'Não disponível'
            }
        };
    },
    
    // Monitorar recursos da página
    monitorPageResources() {
        if (!performance.getEntriesByType) return;
        
        const resources = performance.getEntriesByType('resource');
        const slowResources = resources.filter(resource => resource.duration > 1000);
        
        if (slowResources.length > 0 && typeof Debug !== 'undefined') {
            Debug.warning(`Recursos lentos detectados (${slowResources.length}):`, 
                slowResources.map(r => ({
                    nome: r.name.split('/').pop(),
                    duracao: `${r.duration.toFixed(2)}ms`,
                    tipo: r.initiatorType
                }))
            );
        }
    },
    
    // Monitorar performance da página continuamente
    startContinuousMonitoring() {
        // Monitorar a cada 30 segundos
        setInterval(() => {
            this.monitorPageResources();
        }, 30000);
        
        // Monitorar quando a página fica visível novamente
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.monitorPageResources();
            }
        });
    },
    
    // Marcar pontos importantes de performance
    mark(markName) {
        if (performance.mark) {
            performance.mark(markName);
        }
        
        if (typeof Debug !== 'undefined') {
            Debug.log(`📍 Mark: ${markName}`, 'info');
        }
    },
    
    // Medir entre dois marks
    measureBetween(measureName, startMark, endMark) {
        if (performance.measure) {
            try {
                performance.measure(measureName, startMark, endMark);
                const measure = performance.getEntriesByName(measureName)[0];
                
                if (measure && typeof Debug !== 'undefined') {
                    Debug.log(`📏 Medição ${measureName}: ${measure.duration.toFixed(2)}ms`, 'info');
                }
                
                return measure ? measure.duration : 0;
            } catch (error) {
                if (typeof Debug !== 'undefined') {
                    Debug.warning(`Erro ao medir entre marks: ${error.message}`);
                }
            }
        }
        return 0;
    },
    
    // Limpar métricas
    reset() {
        this.operations.clear();
        this.metrics = {
            totalOperations: 0,
            averageTime: 0,
            slowestOperation: { name: '', duration: 0 },
            fastestOperation: { name: '', duration: Infinity }
        };
        
        if (typeof Debug !== 'undefined') {
            Debug.info('Métricas de performance resetadas');
        }
    }
};

// Disponibilizar globalmente
window.Performance = Performance;

// Funções de conveniência globais
window.perfStart = (name) => Performance.start(name);
window.perfEnd = (name) => Performance.end(name);
window.perfMeasure = (name, fn) => Performance.measure(name, fn);

// Iniciar monitoramento contínuo
Performance.startContinuousMonitoring();

console.log('✅ PERFORMANCE: Sistema de performance carregado');
