document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('-translate-x-full');
        });
    }

    // Check which page we're on
    const currentPage = document.querySelector('h1')?.textContent;

    if (currentPage === 'Gestión de Usuarios') {
        // Users page functionality
        const users = [
            { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'Admin', status: 'Activo' },
            { id: 2, name: 'María García', email: 'maria@example.com', role: 'Usuario', status: 'Activo' },
            { id: 3, name: 'Carlos López', email: 'carlos@example.com', role: 'Editor', status: 'Inactivo' },
            { id: 4, name: 'Ana Martínez', email: 'ana@example.com', role: 'Usuario', status: 'Activo' },
            { id: 5, name: 'Pedro Sánchez', email: 'pedro@example.com', role: 'Usuario', status: 'Inactivo' }
        ];

        const userTableBody = document.getElementById('userTableBody');
        const totalUsersElement = document.getElementById('totalUsers');
        const activeUsersElement = document.getElementById('activeUsers');
        const newUsersElement = document.getElementById('newUsers');

        // Update user statistics
        function updateUserStats() {
            totalUsersElement.textContent = users.length;
            activeUsersElement.textContent = users.filter(user => user.status === 'Activo').length;
            newUsersElement.textContent = '3'; // This would typically be calculated based on registration dates
        }

        // Render user table
        function renderUserTable() {
            userTableBody.innerHTML = '';
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">${user.name}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${user.email}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${user.role}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                            ${user.status}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button class="text-indigo-600 hover:text-indigo-900 mr-2" onclick="editUser(${user.id})">Editar</button>
                        <button class="text-red-600 hover:text-red-900" onclick="deleteUser(${user.id})">Eliminar</button>
                    </td>
                `;
                userTableBody.appendChild(row);
            });
        }

        // Initialize user table and stats
        renderUserTable();
        updateUserStats();

        // Modal functionality
        const modal = document.getElementById('userModal');
        const addUserBtn = document.getElementById('addUserBtn');
        const closeModal = document.getElementById('closeModal');
        const userForm = document.getElementById('userForm');
        const modalTitle = document.getElementById('modalTitle');

        addUserBtn.addEventListener('click', () => {
            modalTitle.textContent = 'Agregar Usuario';
            userForm.reset();
            modal.classList.remove('hidden');
        });

        closeModal.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        userForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(userForm);
            const newUser = {
                id: users.length + 1,
                name: formData.get('userName'),
                email: formData.get('userEmail'),
                role: formData.get('userRole'),
                status: formData.get('userStatus')
            };
            users.push(newUser);
            renderUserTable();
            updateUserStats();
            modal.classList.add('hidden');
        });

        // Edit user function
        window.editUser = function(userId) {
            const user = users.find(u => u.id === userId);
            if (user) {
                modalTitle.textContent = 'Editar Usuario';
                document.getElementById('userName').value = user.name;
                document.getElementById('userEmail').value = user.email;
                document.getElementById('userRole').value = user.role;
                document.getElementById('userStatus').value = user.status;
                modal.classList.remove('hidden');
                
                userForm.onsubmit = (e) => {
                    e.preventDefault();
                    const formData = new FormData(userForm);
                    user.name = formData.get('userName');
                    user.email = formData.get('userEmail');
                    user.role = formData.get('userRole');
                    user.status = formData.get('userStatus');
                    renderUserTable();
                    updateUserStats();
                    modal.classList.add('hidden');
                };
            }
        };

        // Delete user function
        window.deleteUser = function(userId) {
            if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
                const index = users.findIndex(u => u.id === userId);
                if (index !== -1) {
                    users.splice(index, 1);
                    renderUserTable();
                    updateUserStats();
                }
            }
        };

    } else if (currentPage === 'Reportes') {
        // Reports page charts and tables
        
        // Sales by Category Chart
        const salesByCategoryCtx = document.getElementById('salesByCategoryChart')?.getContext('2d');
        if (salesByCategoryCtx) {
            new Chart(salesByCategoryCtx, {
                type: 'pie',
                data: {
                    labels: ['Electrónicos', 'Ropa', 'Alimentos', 'Libros'],
                    datasets: [{
                        data: [30, 25, 20, 25],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                            'rgba(75, 192, 192, 0.8)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                        title: {
                            display: true,
                            text: 'Ventas por Categoría'
                        }
                    }
                }
            });
        }

        // User Trend Chart
        const userTrendCtx = document.getElementById('userTrendChart')?.getContext('2d');
        if (userTrendCtx) {
            new Chart(userTrendCtx, {
                type: 'line',
                data: {
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Nuevos Usuarios',
                        data: [65, 59, 80, 81, 56, 55],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Geographic Distribution Chart
        const geographicDistributionCtx = document.getElementById('geographicDistributionChart')?.getContext('2d');
        if (geographicDistributionCtx) {
            new Chart(geographicDistributionCtx, {
                type: 'bar',
                data: {
                    labels: ['Norte', 'Sur', 'Este', 'Oeste', 'Centro'],
                    datasets: [{
                        label: 'Ventas por Región',
                        data: [12, 19, 3, 5, 2],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(153, 102, 255, 0.8)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Sales Performance Table
        const salesPerformance = [
            { product: 'Laptop', sales: 120, revenue: '$120,000', growth: '+15%' },
            { product: 'Smartphone', sales: 200, revenue: '$100,000', growth: '+10%' },
            { product: 'Tablet', sales: 80, revenue: '$40,000', growth: '+5%' },
            { product: 'Smartwatch', sales: 50, revenue: '$25,000', growth: '+20%' }
        ];

        const salesPerformanceTable = document.getElementById('salesPerformanceTable');
        if (salesPerformanceTable) {
            salesPerformance.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">${item.product}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${item.sales}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${item.revenue}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-green-600">${item.growth}</td>
                `;
                salesPerformanceTable.appendChild(row);
            });
        }
    } else {
        // Home page charts and tables
        const salesChartCtx = document.getElementById('salesChart')?.getContext('2d');
        if (salesChartCtx) {
            new Chart(salesChartCtx, {
                type: 'bar',
                data: {
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Ventas',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    responsive: true
                }
            });
        }

        // User Table
        const users = [
            { name: 'Juan Pérez', email: 'juan@example.com', role: 'Admin' },
            { name: 'María García', email: 'maria@example.com', role: 'Usuario' },
            { name: 'Carlos López', email: 'carlos@example.com', role: 'Usuario' }
        ];

        const userTableBody = document.getElementById('userTableBody');
        if (userTableBody) {
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">${user.name}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${user.email}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${user.role}</td>
                `;
                userTableBody.appendChild(row);
            });
        }
    }
});
