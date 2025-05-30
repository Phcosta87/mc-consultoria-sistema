// =====================================
// 📄 SISTEMA DE PAGINAÇÃO AVANÇADO
// MC Consultoria - Sistema de Licitações
// =====================================

const Pagination = {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: CONFIG.PAGINATION.ITEMS_PER_PAGE,
    maxVisiblePages: CONFIG.PAGINATION.MAX_VISIBLE_PAGES,
    
    // Renderizar paginação
    render() {
        const totalPages = Math.ceil(AppState.totalItems / AppState.pageSize);
        
        Debug.log(`🔄 Renderizando paginação: Total ${AppState.totalItems}, Páginas ${totalPages}, Atual ${AppState.currentPage}`, 'info');
        
        // Esconder se não há itens suficientes
        if (AppState.totalItems <= AppState.pageSize) {
            UI.hideSection('paginationSection');
            Debug.log('Paginação não necessária - poucos resultados', 'info');
            return;
        }
        
        UI.showSection('paginationSection');
        
        this.updatePageInfo();
        this.updateNavigationButtons(totalPages);
        this.renderPageNumbers(totalPages);
        
        Debug.log('✅ Paginação renderizada com sucesso', 'success');
    },
    
    // Atualizar informações da página
    updatePageInfo() {
        const startItem = (AppState.currentPage - 1) * AppState.pageSize + 1;
        const endItem = Math.min(AppState.currentPage * AppState.pageSize, AppState.totalItems);
        
        const elements = {
            showingFrom: document.getElementById('showingFrom'),
            showingTo: document.getElementById('showingTo'),
            totalResults: document.getElementById('totalResults')
        };
        
        if (elements.showingFrom) {
            elements.showingFrom.textContent = startItem.toLocaleString('pt-BR');
        }
        if (elements.showingTo) {
            elements.showingTo.textContent = endItem.toLocaleString('pt-BR');
        }
        if (elements.totalResults) {
            elements.totalResults.textContent = AppState.totalItems.toLocaleString('pt-BR');
        }
        
        Debug.log('Informações da página atualizadas', 'info', {
            de: startItem,
            ate: endItem,
            total: AppState.totalItems
        });
    },
    
    // Atualizar botões de navegação
    updateNavigationButtons(totalPages) {
        const buttons = {
            first: document.getElementById('firstPageBtn'),
            previous: document.getElementById('prevPageBtn'),
            next: document.getElementById('nextPageBtn'),
            last: document.getElementById('lastPageBtn')
        };
        
        // Botão primeira página
        if (buttons.first) {
            buttons.first.disabled = AppState.currentPage === 1;
            this.updateButtonState(buttons.first, AppState.currentPage === 1);
        }
        
        // Botão página anterior
        if (buttons.previous) {
            buttons.previous.disabled = AppState.currentPage === 1;
            this.updateButtonState(buttons.previous, AppState.currentPage === 1);
        }
        
        // Botão próxima página
        if (buttons.next) {
            buttons.next.disabled = AppState.currentPage >= totalPages;
            this.updateButtonState(buttons.next, AppState.currentPage >= totalPages);
        }
        
        // Botão última página
        if (buttons.last) {
            buttons.last.disabled = AppState.currentPage >= totalPages;
            this.updateButtonState(buttons.last, AppState.currentPage >= totalPages);
        }
        
        Debug.log('Botões de navegação atualizados', 'info', {
            paginaAtual: AppState.currentPage,
            totalPaginas: totalPages
        });
    },
    
    // Atualizar estado visual do botão
    updateButtonState(button, isDisabled) {
        if (isDisabled) {
            button.classList.add('opacity-50', 'cursor-not-allowed');
            button.classList.remove('hover:bg-gray-50');
        } else {
            button.classList.remove('opacity-50', 'cursor-not-allowed');
            button.classList.add('hover:bg-gray-50');
        }
    },
    
    // Renderizar números das páginas
    renderPageNumbers(totalPages) {
        const pageNumbers = document.getElementById('pageNumbers');
        if (!pageNumbers) return;
        
        pageNumbers.innerHTML = '';
        
        const { startPage, endPage } = this.calculatePageRange(totalPages);
        
        // Adicionar botão "..." antes se necessário
        if (startPage > 1) {
            this.addPageButton(pageNumbers, 1);
            if (startPage > 2) {
                this.addEllipsis(pageNumbers);
            }
        }
        
        // Adicionar números das páginas
        for (let i = startPage; i <= endPage; i++) {
            this.addPageButton(pageNumbers, i, i === AppState.currentPage);
        }
        
        // Adicionar botão "..." depois se necessário
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                this.addEllipsis(pageNumbers);
            }
            this.addPageButton(pageNumbers, totalPages);
        }
        
        Debug.log('Números das páginas renderizados', 'info', {
            startPage,
            endPage,
            totalPages,
            currentPage: AppState.currentPage
        });
    },
    
    // Calcular range de páginas a mostrar
    calculatePageRange(totalPages) {
        let startPage, endPage;
        
        if (totalPages <= this.maxVisiblePages) {
            // Mostrar todas as páginas
            startPage = 1;
            endPage = totalPages;
        } else {
            // Calcular range centrado na página atual
            const halfVisible = Math.floor(this.maxVisiblePages / 2);
            startPage = Math.max(1, AppState.currentPage - halfVisible);
            endPage = Math.min(totalPages, startPage + this.maxVisiblePages - 1);
            
            // Ajustar se estiver no final
            if (endPage - startPage + 1 < this.maxVisiblePages) {
                startPage = Math.max(1, endPage - this.maxVisiblePages + 1);
            }
        }
        
        return { startPage, endPage };
    },
    
    // Adicionar botão de página
    addPageButton(container, pageNumber, isActive = false) {
        const button = document.createElement('button');
        button.className = `px-3 py-1 rounded-md border transition-all duration-200 ${
            isActive 
                ? 'bg-blue-500 text-white border-blue-500 shadow-md' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-blue-400'
        }`;
        button.textContent = pageNumber;
        button.onclick = () => this.goToPage(pageNumber);
        
        // Adicionar tooltip
        button.title = `Ir para página ${pageNumber}`;
        
        // Adicionar animação
        button.addEventListener('mouseenter', () => {
            if (!isActive) {
                button.style.transform = 'translateY(-1px)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
        
        container.appendChild(button);
    },
    
    // Adicionar ellipsis (...)
    addEllipsis(container) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'px-3 py-1 text-gray-500';
        ellipsis.textContent = '...';
        container.appendChild(ellipsis);
    },
    
    // Ir para página específica
    goToPage(pageNumber) {
        if (pageNumber < 1 || pageNumber > Math.ceil(AppState.totalItems / AppState.pageSize)) {
            Debug.warning(`Página inválida: ${pageNumber}`);
            return;
        }
        
        if (pageNumber === AppState.currentPage) {
            Debug.log(`Já está na página ${pageNumber}`);
            return;
        }
        
        Debug.log(`📄 Navegando para página: ${pageNumber}`, 'info');
        
        // Scroll para o topo da tabela
        const resultsSection = document.getElementById('resultsSection');
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Executar busca na nova página
        if (typeof Search !== 'undefined') {
            Search.execute(pageNumber);
        } else {
            Debug.error('Search engine não disponível');
        }
    },
    
    // Ir para primeira página
    firstPage() {
        this.goToPage(1);
    },
    
    // Ir para página anterior
    previousPage() {
        if (AppState.currentPage > 1) {
            this.goToPage(AppState.currentPage - 1);
        }
    },
    
    // Ir para próxima página
    nextPage() {
        const totalPages = Math.ceil(AppState.totalItems / AppState.pageSize);
        if (AppState.currentPage < totalPages) {
            this.goToPage(AppState.currentPage + 1);
        }
    },
    
    // Ir para última página
    lastPage() {
        const totalPages = Math.ceil(AppState.totalItems / AppState.pageSize);
        this.goToPage(totalPages);
    },
    
    // Obter informações da paginação
    getInfo() {
        const totalPages = Math.ceil(AppState.totalItems / AppState.pageSize);
        const startItem = (AppState.currentPage - 1) * AppState.pageSize + 1;
        const endItem = Math.min(AppState.currentPage * AppState.pageSize, AppState.totalItems);
        
        return {
            currentPage: AppState.currentPage,
            totalPages: totalPages,
            totalItems: AppState.totalItems,
            itemsPerPage: AppState.pageSize,
            startItem: startItem,
            endItem: endItem,
            hasNextPage: AppState.currentPage < totalPages,
            hasPreviousPage: AppState.currentPage > 1
        };
    },
    
    // Configurar teclas de atalho
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            // Só ativar se não estiver em um input
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
                return;
            }
            
            const totalPages = Math.ceil(AppState.totalItems / AppState.pageSize);
            
            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    this.previousPage();
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    this.nextPage();
                    break;
                case 'Home':
                    event.preventDefault();
                    this.firstPage();
                    break;
                case 'End':
                    event.preventDefault();
                    this.lastPage();
                    break;
            }
        });
        
        Debug.log('Teclas de atalho da paginação configuradas', 'info');
    },
    
    // Atualizar configurações
    updateSettings(newSettings) {
        if (newSettings.itemsPerPage) {
            this.itemsPerPage = newSettings.itemsPerPage;
            AppState.pageSize = newSettings.itemsPerPage;
        }
        
        if (newSettings.maxVisiblePages) {
            this.maxVisiblePages = newSettings.maxVisiblePages;
        }
        
        Debug.log('Configurações da paginação atualizadas', 'info', newSettings);
    }
};

// Configurar teclas de atalho
Pagination.setupKeyboardShortcuts();

// Funções globais
window.Pagination = Pagination;
window.firstPage = () => Pagination.firstPage();
window.previousPage = () => Pagination.previousPage();
window.nextPage = () => Pagination.nextPage();
window.lastPage = () => Pagination.lastPage();

console.log('✅ PAGINATION: Sistema de paginação avançado carregado');
