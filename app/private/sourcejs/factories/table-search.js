/*
  Busca em tabela (Refactored to Factory Pattern)
  Por: Giordano 😎
*/

const TableSearchFactory = (() => {
    const allSearches = [];

    // Helper: Extracts and normalizes text for searching without expensive DOM cloning
    const extractRowText = (row) => {
        let text = row.textContent || "";
        // Grab values from any select dropdowns
        const selects = row.querySelectorAll('select');
        selects.forEach(select => {
            text += select.options[select.selectedIndex]?.text || "";
        });
        return text.toLowerCase().replace(/\s+/g, ''); // remove all whitespace/newlines
    };

    // The Factory Function
    const create = (table) => {
        const tbody = table.querySelector('tbody') || table.children[1];

        // Encapsulated State
        const state = {
            rows: [],
            searchIndex: [], // parallel array to 'rows' for fast text searching
            filteredRows: [],
            currentPage: 1,
            rowsPerPage: 15,
            isFocused: false
        };

        // Encapsulated UI Elements
        const ui = {
            searchBar: document.createElement('input'),
            controls: document.createElement('section'),
            pageLabel: document.createElement('label'),
            btnPrev: document.createElement('button'),
            btnNext: document.createElement('button')
        };

        // --- Core Logic ---

        const loadRowsIntoMemory = () => {
            state.rows = Array.from(tbody.children);
            state.searchIndex = state.rows.map(extractRowText);
            refresh();
        };

        const renderPage = () => {
            tbody.innerHTML = '';

            const totalPages = Math.ceil(state.filteredRows.length / state.rowsPerPage) || 1;
            // Clamp current page
            state.currentPage = Math.max(1, Math.min(state.currentPage, totalPages));

            ui.pageLabel.innerText = `: ${state.currentPage} / ${totalPages}`;

            const startIdx = (state.currentPage - 1) * state.rowsPerPage;
            const endIdx = startIdx + state.rowsPerPage;
            const rowsToRender = state.filteredRows.slice(startIdx, endIdx);

            // Use a DocumentFragment for performance (prevents layout thrashing)
            const fragment = document.createDocumentFragment();
            rowsToRender.forEach(row => fragment.appendChild(row));
            tbody.appendChild(fragment);
        };

        const search = (query) => {
            const keywords = query.toLowerCase().split(' ').filter(k => k);

            state.filteredRows = state.rows.filter((row, i) => {
                const rowText = state.searchIndex[i];
                return keywords.every(key => rowText.includes(key));
            });

            state.currentPage = 1;
            renderPage();
        };

        const refresh = () => search(ui.searchBar.value || "");

        const changePage = (increment) => {
            state.currentPage += increment;
            renderPage();
        };

        // --- Exports / Utilities ---

        const copyAsSpreadsheet = () => {
            let content = "";
            // Headers
            const headers = table.querySelector('thead > tr')?.cells || [];
            Array.from(headers).forEach(cell => content += cell.innerText + '\t');
            content += '\n';

            // Rows
            state.rows.forEach(row => {
                Array.from(row.cells).forEach(cell => content += cell.innerText + '\t');
                content += '\n';
            });

            navigator.clipboard.writeText(content);
        };

        // --- Initialization & UI Setup ---

        const initUI = () => {
            // Search Bar Setup
            ui.searchBar.type = 'text';
            ui.searchBar.className = 'form-control input-sm';
            ui.searchBar.addEventListener('input', (ev) => search(ev.target.value));

            const label = document.createElement('label');
            label.innerText = 'Buscar:';
            label.style.cssText = 'display: inline-flex; align-items: center; gap: 8px; margin-bottom: 8px;';
            label.appendChild(ui.searchBar);
            table.parentNode.insertBefore(label, table);

            // Controls Setup
            table.after(ui.controls);
            const btnStyle = 'padding: 1rem 2rem; border: 1px solid #ccc; border-radius: .5rem; cursor: pointer;';

            // Previous Button
            ui.btnPrev.style.cssText = btnStyle;
            ui.btnPrev.innerHTML = `<img src="/frangolandia/assets/img/icons/table-arrow.webp" alt="left" style="height: 20px; transform: rotateY(180deg); padding: .4rem;">`;
            ui.btnPrev.onclick = () => changePage(-1);
            ui.controls.appendChild(ui.btnPrev);

            // Next Button
            ui.btnNext.style.cssText = btnStyle;
            ui.btnNext.innerHTML = `<img src="/frangolandia/assets/img/icons/table-arrow.webp" alt="right" style="height: 20px; padding: .4rem;">`;
            ui.btnNext.onclick = () => changePage(1);
            ui.controls.appendChild(ui.btnNext);

            // Book Icon & Page Label
            const bookIcon = document.createElement('img');
            bookIcon.src = '/frangolandia/assets/img/icons/book.webp';
            bookIcon.style.cssText = 'margin-left: 12px; height: 17px;';
            ui.controls.appendChild(bookIcon);
            ui.controls.appendChild(ui.pageLabel);

            // Select Rows Per Page
            const selectPage = document.createElement('select');
            selectPage.style.cssText = 'margin-left: 1rem; padding: .65rem 1rem; border: 1px solid #ccc; border-radius: .65rem;';
            [8, 15, 25, 50, 80].forEach(num => {
                const opt = new Option(`${num} linhas`, num);
                if (num === state.rowsPerPage) opt.selected = true;
                selectPage.appendChild(opt);
            });
            selectPage.onchange = (ev) => {
                state.rowsPerPage = parseInt(ev.target.value, 10);
                refresh();
            };
            ui.controls.appendChild(selectPage);

            // Optional Buttons based on dataset
            if (table.hasAttribute('data-print')) {
                const btnPrint = document.createElement('button');
                btnPrint.className = 'btn';
                btnPrint.innerText = 'Imprimir';
                btnPrint.style.cssText = 'padding: .65rem .75rem; font-size: 11px; margin-left: 8px;';
                btnPrint.onclick = () => {
                    const frame = document.createElement('iframe');
                    frame.style.display = 'none';
                    frame.src = "/frangolandia/views/modal/print_table.php";
                    document.body.appendChild(frame);
                    frame.onload = () => {
                        frame.contentWindow.setData(table, state.rows);
                        frame.contentWindow.print();
                        setTimeout(() => frame.remove(), 100);
                    };
                };
                label.appendChild(btnPrint);
            }

            if (table.hasAttribute('data-excel')) {
                const btnExcel = document.createElement('button');
                btnExcel.className = 'btn';
                btnExcel.innerText = 'Copiar Excel';
                btnExcel.style.cssText = 'padding: .65rem .75rem; font-size: 11px; margin-left: 8px;';
                btnExcel.onclick = copyAsSpreadsheet;
                label.appendChild(btnExcel);
            }
        };

        const setupKeyboardNav = () => {
            table.tabIndex = allSearches.length + 1;
            table.addEventListener('focus', () => state.isFocused = true);
            table.addEventListener('blur', () => state.isFocused = false);

            window.addEventListener('keydown', (ev) => {
                if (!state.isFocused) return;
                if (ev.key === 'ArrowRight') changePage(1);
                if (ev.key === 'ArrowLeft') changePage(-1);
            });
        };

        // Bootstrap the instance
        initUI();
        setupKeyboardNav();
        loadRowsIntoMemory();

        // Return the Public API
        const publicAPI = {
            table,
            search,
            refresh,
            copyAsSpreadsheet,
            get rows() { return state.rows; },
            get currentPage() { return state.currentPage; }
        };

        allSearches.push(publicAPI);
        return publicAPI;
    };

    // Auto-init for elements with the data attribute
    const start = () => {
        document.querySelectorAll('table[data-table-intranet]').forEach(create);
    };

    return { start, create, get all() { return allSearches; } };
})();

window.addEventListener('DOMContentLoaded', () => TableSearchFactory.start());

export default TableSearchFactory;