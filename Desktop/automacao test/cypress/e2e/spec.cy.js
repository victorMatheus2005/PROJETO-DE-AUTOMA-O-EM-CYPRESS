describe('Automation Exercise', () => { // Define um conjunto de testes (Suite) com o título 'Automation Exercise'.
    it('TC01: Cadastro de Usuario', () => { // Define um caso de teste (Test Case) específico com o título 'TC01: Cadastro de Usuário'.

        // 1. Início do Teste e Navegação
        cy.visit('https://automationexercise.com/') //  Visita a URL base do site.
        cy.get('a[href="/login"]').click() //  Localiza e clica no link de Login/Registro.

        // 2. Preenchimento Inicial do Formulário de Cadastro (Sign Up)
        cy.get('input[data-qa="signup-name"]').type('Victor') //  Preenche o campo de nome para o cadastro com 'Victor'.
        cy.get('input[data-qa="signup-email"]').type('vms-matheus-205@gmail.com') //  Preenche o campo de email para o cadastro.
        cy.get('button[data-qa="signup-button"]').click() //  Clica no botão de Cadastro ('Sign Up').

        // 3. Preenchimento dos Detalhes da Conta (Account Information)
        cy.get('input[id="id_gender2"]').check() //  Marca o *radio button* para o Gênero 'Mrs.' ou 'Ms.' (assumindo que id_gender2 é feminino/Sra.).
        cy.get('input[id="password"]').type('54321') //  Preenche o campo de Senha.
        cy.get('select[id="days"]').select('13') //  Seleciona o dia '13' no dropdown de Dia de Nascimento.
        cy.get('select[id="months"]').select('May') //  Seleciona o mês 'May' no dropdown de Mês de Nascimento.
        cy.get('select[id="years"]').select('2001') //  Seleciona o ano '2001' no dropdown de Ano de Nascimento.
        cy.get('input[id="newsletter"]').check() //  Marca o checkbox para receber a Newsletter.
        
        // 4. Preenchimento dos Detalhes do Endereço (Address Information)
        cy.get('input[data-qa="first_name"]').type('Victor') //  Preenche o Primeiro Nome no formulário de endereço.
        cy.get('input[data-qa="last_name"]').type('Matheus') //  Preenche o Sobrenome no formulário de endereço.
        cy.get('input[data-qa="address"]').type('Rua dos Gatos, 234') //  Preenche o Endereço.
        cy.get('select[data-qa="country"]').select('Canada') //  Seleciona 'Canada' no dropdown de País.
        cy.get('input[data-qa="state"]').type('Pernambuco') //  Preenche o Estado/Província.
        cy.get('input[data-qa="city"]').type('Caruaru') //  Preenche a Cidade.
        cy.get('input[data-qa="zipcode"]').type('77777') //  Preenche o CEP/Código Postal.
        cy.get('input[data-qa="mobile_number"]').type('99999-9999') //  Preenche o Número de Celular.

        cy.get('button[data-qa="create-account"]').click() //  Clica no botão para Criar a Conta ('Create Account').

        // 5. Verificações (Asserções)
        // **Asserção:** Verifica se a URL atual *inclui* o caminho '/account_created', confirmando o redirecionamento.
        cy.url().should('include', '/account_created') 
        // **Asserção:** Verifica se o elemento com o seletor 'h2[data-qa="account-created"]' contém o texto 'Account Created!'.
        cy.get('h2[data-qa="account-created"]').should('contain.text', 'Account Created!') 

    });
});

/// <reference types="cypress" />

describe('TC02: Login User with correct email and password', () => {
    
    // Dados para o teste (substitua a senha)
    const validEmail = "vms-matheus-205@gmail.com";
    const correctPassword = "54321";

    it('Deve fazer login com sucesso usando email e senha corretos', () => {
        
        cy.visit('/'); // 1. Navegar para a URL base
        cy.get('header .logo').should('be.visible');// 2. Verificar se a página inicial está visível (Home Page)
        cy.get('a[href="/login"]').click();// 3. Clicar no botão 'Signup / Login'
        cy.contains('Login to your account').should('be.visible');// 4. Verificar se 'Login to your account' está visível
        cy.get('[data-qa="login-email"]').type(validEmail).should('have.value', validEmail); // NOVO: Verifica o valor.// 5. Inserir email e senha corretos
        cy.get('[data-qa="login-password"]').type(correctPassword);
        cy.get('[data-qa="login-button"]').click();// 6. Clicar no botão 'Login'
        cy.contains('Logged in as').should('be.visible');// 7. Verificar se 'Logged in as username' está visível
        cy.get('a[href="/logout"]').should('be.visible');// Verifica se o botão 'Logout' está visível
        cy.get('a[href="/logout"]').click();// 8. Clicar no botão 'Logout'
        cy.url().should('include', '/login');// 9. Verificar se o usuário foi redirecionado para a página de login
        cy.contains('Login to your account').should('be.visible');
        cy.get('[data-qa="login-button"]').should('be.visible');
    });
});

/// <reference types="cypress" />

describe('TC05: Registrar usuario com email existente', () => {
    
    // Email VÁLIDO e CADASTRADO no sistema (Assumimos ser o do TC 2)
    const existingEmail = "vms-matheus-205@gmail.com"; 
    const fakeName = "Tester Existing"; // Nome aleatório, o foco é o e-mail

    it('Deve falhar o registro e exibir erro ao tentar usar um email existente', () => {
        
        // 1. Navegar para a URL base
        cy.visit('/');

        // 2. Verificar se a página inicial está visível (Home Page)
        cy.get('header .logo').should('be.visible');

        // 3. Clicar no botão 'Signup / Login'
        cy.get('a[href="/login"]').click();
        
        // 4. Verificar se 'New User Signup!' está visível
        cy.contains('New User Signup!').should('be.visible');

        // 5. Inserir um nome e o email JÁ REGISTRADO
        cy.get('[data-qa="signup-name"]').type(fakeName).should('have.value', fakeName); // NOVO: Verifica o valor.
        cy.get('[data-qa="signup-email"]').type(existingEmail).should('have.value', existingEmail);

        // 6. Clicar no botão 'Signup'
        cy.get('[data-qa="signup-button"]').click();

        // 7. Verificar se a mensagem de erro 'Email Address already exist!' está visível
        // Este é o passo chave de validação
        cy.contains('Email Address already exist!').should('be.visible');
    });
});

// Adiciona o comando personalizado 'login'
Cypress.Commands.add('login', (email, password) => {
    // 1. Navega para a página de login
    cy.visit('/login'); 
    
    // 2. Insere as credenciais
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(password);
    
    // 3. Clica no botão de login
    cy.get('[data-qa="login-button"]').click();
    
    // 4. Verifica se o login foi bem-sucedido
    cy.contains('Logged in as').should('be.visible');
});

/// <reference types="cypress" />

describe('TC04: Logout User', () => {
    
    // Use as credenciais VÁLIDAS do Test Case 2
    const validEmail = "vms-matheus-205@gmail.com"; 
    const correctPassword = "SUA_SENHA_CORRETA_AQUI"; // 🚨 SUBSTITUA PELA SENHA REAL

    it('Deve fazer logout após o login com sucesso', () => {
        
        // 1. Lançar o navegador e navegar para a URL base (implícito na visita do comando login)
        // 2. Fazer login com sucesso (cobre os passos 3 a 7 do TC 2)
        cy.login(validEmail, correctPassword); 

        cy.get('a[href="/logout"]').should('be.visible'); // Verifica se o botão 'Logout' está visível
        
        // 3. Clicar no botão 'Logout'
        cy.get('a[href="/logout"]').click();

        // 4. Verificar se o usuário foi redirecionado para a página de login
        cy.url().should('include', '/login');
        
        // 5. Verificar se 'Login to your account' está visível, confirmando que a página de login foi carregada.
        cy.contains('Login to your account').should('be.visible');
        cy.get('a[href="/login"]').should('have.class', 'active');
    });
});

/// <reference types="cypress" />

import { generateContactInfo } from '../support/dataGenerator';

describe('TC06: Formular contato', () => {
    
    // Gera dados únicos para o formulário de contato
    const contactData = generateContactInfo();

    it('Deve preencher e submeter o formulário de contato com sucesso', () => {
        
        // 1. Navegar para a URL base
        cy.visit('/');

        // 2. Verificar se a página inicial está visível
        cy.get('header .logo').should('be.visible');

        // 3. Clicar no botão 'Contact Us'
        cy.get('a[href="/contact_us"]').click();

        // 4. Verificar se 'GET IN TOUCH' está visível
        cy.contains('Get In Touch').should('be.visible');

        // 5. Preencher os detalhes: Nome, Email, Assunto e Mensagem
        cy.get('[data-qa="name"]').type(contactData.name).should('have.value', contactData.name);
        cy.get('[data-qa="email"]').type(contactData.email).should('have.value', contactData.email);
        cy.get('[data-qa="subject"]').type(contactData.subject).should('have.value', contactData.subject);
        cy.get('[data-qa="message"]').type(contactData.message).should('have.value', contactData.message);

        // 6. Fazer upload de um arquivo (usando o plugin cypress-file-upload)
        // O arquivo 'example.json' é um arquivo de teste padrão do Cypress.
        cy.get('[name="upload_file"]').selectFile('cypress/fixtures/example.json').should('have.value', 'C:\\fakepath\\example.json');
        
        // 7. Clicar no botão 'Submit'
        cy.get('[data-qa="submit-button"]').click();

        // 8. Clicar no botão 'OK' do alerta de confirmação do navegador
        // O Cypress gerencia janelas de alerta automaticamente. Usamos on() para capturar o texto.
        cy.on('window:confirm', (t) => {
            expect(t).to.equal('Press OK to proceed!');
            return true; // Retornar 'true' simula o clique em OK
        });

        // 9. Verificar se a mensagem de sucesso está visível
        cy.get('.status.alert-success').should('be.visible')
          .and('contain.text', 'Success! Your details have been submitted successfully.');

        // 10. Clicar no botão 'Home'
        cy.get('a.btn-success[href="/"]').click();

        // 11. Verificar se a página inicial é carregada com sucesso
        cy.url().should('eq', 'https://automationexercise.com/');
    });
});

/// <reference types="cypress" />

describe('TC08: Verificar a lista de produtos e a página de detalhes de um produto', () => {

    it('Deve verificar a lista de produtos e visualizar a página de detalhes de um produto', () => {
        
        cy.visit('/');
        cy.get('header .logo').should('be.visible');
        cy.get('a[href="/products"]').click();
        
        cy.url().should('include', '/products');
        cy.contains('All Products').should('be.visible');

        cy.get('.features_items').should('be.visible');
        cy.get('.product-image-wrapper').its('length').should('be.gt', 1);

        // Clica em 'View Product'
        cy.get('.choose .nav.nav-pills.nav-justified').first().click();

        cy.url().should('include', 'product_details');
        
        // Verificações de detalhes
        cy.get('.product-information h2').should('be.visible').and('not.be.empty');
        cy.get('.product-information p').contains('Category:').should('be.visible').and('not.be.empty'); // NOVO: Garante que a categoria não está vazia.
        cy.get('.product-information span:contains("Rs.")').should('be.visible').and('have.length.gt', 0); // NOVO: Garante que o preço foi exibido.
        cy.get('.product-information p').contains('Availability:').should('be.visible').and('not.contain.text', 'Out of Stock'); // NOVO: Verifica se não está 'Out of Stock'.
    });
});

/// <reference types="cypress" />

describe('TC9: Procurar Produto', () => {
    
    const searchTerm = 'Tshirt'; 

    it('Deve buscar um produto e verificar que apenas os resultados correspondentes são exibidos', () => {
        
        cy.visit('/');
        cy.get('header .logo').should('be.visible');
        cy.get('a[href="/products"]').click();
        cy.contains('All Products').should('be.visible');
        
        cy.get('#search_product').type(searchTerm).should('have.value', searchTerm); // NOVO: Verifica o valor.

        cy.get('#submit_search').click();

        cy.contains('Searched Products').should('be.visible');
        cy.get('.features_items').should('be.visible'); // NOVO: Garante que a seção de resultados foi exibida.

        cy.get('.product-image-wrapper').should('be.visible');

        // Verificação do nome de todos os produtos
        cy.get('.product-image-wrapper')
          .find('.productinfo p') 
          .each(($el) => {
            const productName = $el.text().toLowerCase();
            expect(productName).to.include(searchTerm.toLowerCase());
          });
          
        cy.get('.product-image-wrapper').its('length').should('be.gt', 0);
    });
});

/// <reference types="cypress" />
import { generateEmail } from '../support/dataGenerator'; // Importa a função de gerar e-mail

describe('TC10: Vericar descrição da pagina home', () => {
    
    const uniqueEmail = generateEmail(); // Gera um e-mail único

    it('Deve se inscrever na newsletter no rodapé da página inicial', () => {
        
        // 1. Navegar para a URL base
        cy.visit('/');

        // 2. Verificar se a página inicial está visível
        cy.get('header .logo').should('be.visible');
        
        // 3. Rolar a página até o rodapé
        // O elemento com a seção de Inscrição deve estar visível para interagir.
        cy.get('#footer').scrollIntoView().should('be.visible'); // NOVO: Garante que o rodapé está visível.
        
        // 4. Verificar o texto 'SUBSCRIPTION' no rodapé
        cy.contains('Subscription').should('be.visible');

        // 5. Inserir o endereço de e-mail no campo de inscrição
        cy.get('#susbscribe_email').type(uniqueEmail).should('have.value', uniqueEmail); // NOVO: Verifica o valor.
        
        // 6. Clicar no botão de seta para se inscrever
        cy.get('#subscribe').click();

        // 7. Verificar a mensagem de sucesso
        // O site exibe uma mensagem de alerta de sucesso
        cy.get('.alert-success').should('be.visible')
          .and('contain.text', 'You have been successfully subscribed!');
    });
});

/// <reference types="cypress" />
import { generateNewUser } from '../support/dataGenerator'; // Importa a função de gerar usuário completo

describe('TC15: Colocar o pedido, registrar antes do checkout', () => {
    
    // Gera dados únicos para todo o processo
    const newUser = generateNewUser(); 

    // Este bloco de teste executa a lógica do Test Case 1 (Registro)
    before(() => {
        cy.log('Executando o Registro do Usuário (Base para o TC 15)');
        
        // 1. Navegar para a URL base e clicar em 'Signup / Login'
        cy.visit('/');
        cy.get('a[href="/login"]').click();
        
        // 2. Registrar (Passos 5-14 do TC 1)
        cy.get('[data-qa="signup-name"]').type(newUser.name);
        cy.get('[data-qa="signup-email"]').type(newUser.email);
        cy.get('[data-qa="signup-button"]').click();
        
        // 3. Preencher Detalhes da Conta (Os passos 9-13 do TC 1)
        cy.get('#id_gender1').click(); 
        cy.get('[data-qa="password"]').type(newUser.password);
        cy.get('#days').select('15');
        cy.get('#months').select('Novembro');
        cy.get('#years').select('1990');
        
        // Preencher endereço
        cy.get('[data-qa="first_name"]').type(newUser.firstName);
        cy.get('[data-qa="last_name"]').type(newUser.lastName);
        cy.get('[data-qa="company"]').type(newUser.company);
        cy.get('[data-qa="address"]').type(newUser.address1);
        cy.get('[data-qa="country"]').select('Canada'); // Exemplo de País
        cy.get('[data-qa="state"]').type(newUser.state);
        cy.get('[data-qa="city"]').type(newUser.city);
        cy.get('[data-qa="zipcode"]').type(newUser.zipcode);
        cy.get('[data-qa="mobile_number"]').type(newUser.mobileNumber);
        
        cy.get('[data-qa="create-account"]').click();
        
        // 4. Verificar se a conta foi criada e clicar em 'Continue'
        cy.contains('Account Created!').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();
        
        // 5. Verificar que está logado
        cy.contains(`Logged in as ${newUser.firstName}`).should('be.visible');
    });

    it('TC 15: Deve colocar o pedido, registrar antes do checkout e finalizar a compra', () => {
        
        // 1. O usuário já está registrado e logado do bloco 'before()'.

        // 2. Adicionar o primeiro produto ao carrinho
        // Navega para a Home Page novamente (se o 'continue' do registro não o fez)
        cy.visit('/');
        
        // Adicionar o primeiro produto visível no carrossel de produtos populares.
        cy.get('.features_items .product-image-wrapper').first().within(() => {
            // cy.get('.add-to-cart').click(); // Este seletor pode ser mais específico
            cy.get('a.add-to-cart').click();
        });

        // 3. Clicar em 'View Cart' no modal de sucesso
        cy.get('.modal-body h4').should('contain.text', 'Added!');

        cy.get('.modal-content').contains('View Cart').click();

        // 4. Verificar se a página do Carrinho é exibida
        cy.url().should('include', '/view_cart');
        cy.get('#cart_info').should('contain.text', 'Product').and('be.visible'); // NOVO: Garante que a tabela do carrinho foi carregada.
        
        // 5. Clicar em 'Proceed To Checkout'
        cy.get('.check_out').click();

        // 6. Verificar o endereço de entrega/cobrança (já que o usuário está logado)
        cy.contains('Address Details').should('be.visible');
        // Você pode verificar se o nome do endereço preenchido é o mesmo do Faker (ex: newUser.firstName)

        // 7. Inserir descrição na caixa de comentários
        cy.get('textarea[name="message"]').type('Pedido de teste automatizado Cypress.');

        // 8. Clicar em 'Place Order'
        cy.get('a[href="/payment"]').click();

        // 9. Inserir detalhes do pagamento (usando dados mock)
        cy.contains('Payment').should('be.visible'); // NOVO: Garante que a página de pagamento carregou.
        cy.get('[data-qa="name-on-card"]').type('Auto Test User');
        cy.get('[data-qa="card-number"]').type('4100000000000'); // Dados de teste
        cy.get('[data-qa="cvc"]').type('123');
        cy.get('[data-qa="expiry-month"]').type('01');
        cy.get('[data-qa="expiry-year"]').type('2025');

        // 10. Clicar em 'Pay and Confirm Order'
        cy.get('[data-qa="pay-button"]').click();

        // 11. Verificar a mensagem de sucesso
        cy.contains('Order Placed!').should('be.visible');
        cy.get('.alert-success').should('be.visible')
          .and('contain.text', 'Your order has been placed successfully!');

        // 12. Opcional: Clicar em 'Delete Account' para limpar o ambiente
        cy.get('a[href="/delete_account"]').click();
        cy.contains('Account Deleted!').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();
    });
});