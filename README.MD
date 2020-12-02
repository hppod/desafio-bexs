**Necessário ter**
 1. Node.js instalado
	 1. Para instalar o node.js basta acessar o link https://nodejs.org/pt-br/download/ e baixar o instalador para a plataforma desejada (Windows, Linux, macOS)
 2. npm
	 1. O npm é instalado junto com o node.js, porém as vezes pode ser necessário reiniciar o computador após a instalação do node.js para que a plataforma identifique as variáveis de ambiente utilizadas pelo npm e habilite os comandos necessários para rodar essa aplicação

**Como executar a aplicação**
Para executar a aplicação, siga os passos:
 1. Faça um clone do repositório
 2. Acesse o diretório em que o repositório foi clonado
 3. Rode o comando "npm install" para que o node package manager faça o download das dependências do projeto
 4. Para iniciar a interface de console onde é possível passar a rota desejada, digite o comando "npm run prod-app"
 5. Para iniciar o servidor REST, digite o comando "npm run prod-server"
 6. Para executar os testes, digite o comando "npm run test"

**Dependências**
 1. body-parser: responsável por parsear o corpo das requisições que são enviadas a API REST
 2. chai: responsável pelos testes automatizados
 3. chai-http: um pacote do chai para execução de HTTP nos testes automatizados
 4. chai-subset: um pacote do chai para a utilização de objetos nos testes automatizados
 5. cors: responsável por compartilhar recursos entre diferentes origens
 6. express: responsável por manter o servidor HTTP para que a API REST receba as requisições
 7. inquirer: responsável por capturar informações digitadas no console pelo usuário
 8. mocha: responsável pela execução dos testes automatizados

**Estrutura dos arquivos**
 9. Na raiz do projeto há os arquivos CSV, os arquivos de dependências, os arquivos responsáveis pela execução da interface de console (app.js) e pela inicialização da API REST (server.js)
 10. Na pasta "test" estão concentrados todos os testes da aplicação
 11. Na pasta "src" há duas pastas:
	 1. A pasta "controller" contém as classes responsáveis pela lógica que é aplicada quando é feita uma requisição para algum endpoint da API REST
	 2. A pasta "routes" contém o arquivo responsável por identificar as rotas disponíveis na API REST
 12. Na pasta "services" estão concentradas todas as funções que são utilizadas no projeto, tanto pela interface de console quanto pela API REST:
	 1. O arquivo best-flight.js é o arquivo que se comunica diretamente com o arquivo app.js que inicializa a interface de console. Nele há a função bestFlight que retorna a melhor rota disponível dado os pontos, inicial e final. Há também a função buildFlightList que retorna um array de todos os pontos disponíveis no arquivo CSV. Há também a função checkIfThePointsExist que checa se um ponto informado existe no arquivo CSV ou não.
	 2.  O arquivo file-csv.js é o arquivo responsável por manipular os arquivos CSV. Nele há a função load, que carrega o arquivo informado e adiciona as linhas dele no arquivo input-routes.csv. Há a função readPath, que é utilizada pela função load para ler o caminho informado pelo usuário e caso o caminho não exista, disparar um erro. Há também a função addFlight que é responsável por adicionar novos vôos no arquivo CSV.
	 3. O arquivo fork.js é o arquivo responsável por montar um grafo e encontrar o melhor caminho a ser percorrido pelo viajante. Nele há a função addStartPoints que adiciona os pontos iniciais em um array e cria um objeto para cada ponto que é adicionado no array. Há a função addFinalPoints que adiciona um objeto com o ponto inicial e valor, ou ponto final e valor no objeto do ponto criado anteriormente pela função addStartPoints. Há também a função findBetterWay que percorre o array de pontos e adiciona eles em uma fila para que o objeto com os pontos seja percorrido e possa ser verificado qual o melhor caminho a ser feito.
	 4. O arquivo queue.js é o arquivo responsável por montar a fila que é utilizada nas funções do arquivo fork.js. Há a função addToQueue que pega um item e adiciona na fila. Há também a função removeFirstFromQueue que remove e retorna o primeiro elemento na fila. Há também a função checkIfIsEmpty que retorna um booleano indiciando se a fila está vazia ou não

**Decisões da solução**
Para solucionar o problema foi utilizado um algoritmo baseado em grafos que simula vértices e arestas e dá a possibilidade de adicionar valores nas arestas, e por esses valores é possível definir qual é o melhor caminho para o problema, como no caso, qual a viagem mais barata a ser feita, independente o número de conexões a serem realizadas.
Utilizei Node.js na resolução do problema pois tenho uma certa experiência com Javascript. Além do mais, o desenvolvimento de uma API REST utilizando Node.js é muito simples e de fácil aprendizagem.

**API REST**
Para iniciar a API REST, basta digitar o comando "npm run prod-server". O node.js irá executar o servidor na porta 3000 do computador.

Para testar os endpoints, as requisições devem ser feitas para o endereço "http://localhost:3000/ROTA_DESEJADA".

As requisições devem ser feitas por meio de um REST Client, como Postman ou Insomnia.

A API REST é composta por duas rotas:
 1. /api/bestFlight/FROM-TO [http://localhost:3000/api/bestFlight/GRU-CDG]
	 1. Rota do tipo GET que recebe como parâmetro na URL o ponto de partida e o destino final e calcula qual o melhor caminho para ser percorrido, baseado no valor mais baixo, independente do número de conexões que serão feitas.
	 2. Status que podem ser retornados nesse endpoint: [200]
	 3. Mensagens que podem ser retornadas nesse endpoint: 
		 1. *"The best route is GRU,BRC,SCL,ORL,CDG and the price is 22"* - Mensagem retornada quando é encontrada uma rota para o percurso informado
		 2. *"We did not find the starting point 'LAX' or the destination 'PAR' in our records. It is not possible to calculate the smallest value"* - Mensagem retornada quando não é encontrada nenhuma rota que contenha o ponto inicial, ponto final, ou ambos no arquivo de rotas
 2. /api/addNewRoute [http://localhost:3000/api/addNewRoute]
	 1. Rota do tipo POST que recebe como corpo da requisição um array com objetos que contém as chaves "from" que define o ponto, "to" que define o ponto de chegada e "value" que define o valor do percurso. Cada objeto do array é adicionado ao arquivo CSV para que possa ser utilizado na rota do tipo GET ou na interface de console.
	 2. Status que podem ser retornados nesse endpoint: [201, 400]
	 3. Mensagens que podem ser retornadas nesse endpoint:
		 1. *"1 new routes added"* - Mensagem retornada quando as rotas são adicionadas com sucesso. Informa a quantidade de rotas que foram inseridas.
		 2. *"There are errors in the request body. Some objects may not have been inserted correctly"* - Mensagem retornada quando as rotas não são adicionadas totalmente com sucesso. No objeto de response há um array com os erros encontrados ao adicionar percursos. Esses erros são apresentdos em formas de mensagem, como por exemplo: *"It is necessary to inform the FROM key of the index object 0"* que indica que não foi informado um valor para FROM no objeto de indíce 0 da requisição.
