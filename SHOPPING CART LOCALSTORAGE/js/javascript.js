  var carrinhoNome = [];
    var carrinhoPreco = [];
    var carrinhoQntd = [];
    var flag = 0;
        
    function setCarrinho(nome, preco, qntd){
        this.carrinhoNome.push(nome);
        this.carrinhoPreco.push(preco);
        this.carrinhoQntd.push(qntd);
    }
        
    function getCarrinho(){
        document.getElementById('itensDoCarrinho').innerHTML += "<tr><td>" + this.carrinhoNome.slice(this.flag) +"</td><td>" + this.carrinhoPreco.slice(this.flag) +"</td><td>" + this.carrinhoQntd.slice(this.flag) +"</td></tr>";
        this.flag++;
    }
    
    function getTotal(){
        var total = 0;
        for(var i = 0; i < this.carrinhoQntd.length; i++){
            total = total + parseFloat(this.carrinhoPreco.slice(i));
        }
        document.getElementById("totalCarrinho").innerHTML = total.toFixed(2);
    }

    function carrinho(nome, qntd, valor){
        if (document.getElementById(qntd).value == 0){
            document.getElementById(qntd).style = "border: solid 1px red;";
        } else {
            document.getElementById(qntd).style = "border: solid 1px green;";
            var nome = document.getElementById(nome).innerHTML;
            var qntd = document.getElementById(qntd).value;
            var preco = parseFloat(document.getElementById(valor).value).toFixed(2) * qntd; 
            setCarrinho(nome, preco.toFixed(2), qntd);
            getCarrinho();
            getTotal();
            $("#carrinhoDeCompras").modal("show");
        }
    }

//CEP   CEP   CEP   CEP   CEP   CEP   CEP   CEP   CEP   CEP   CEP   
 function limpa_formulário_cep() {
            //Limpa valores do formulário de cep.
            document.getElementById('rua').value=("");
            document.getElementById('bairro').value=("");
            document.getElementById('cidade').value=("");
            document.getElementById('uf').value=("");
    }

    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            document.getElementById('rua').value=(conteudo.logradouro);
            document.getElementById('bairro').value=(conteudo.bairro);
            document.getElementById('cidade').value=(conteudo.localidade);
            document.getElementById('uf').value=(conteudo.uf);
        } //end if.
        else {
            //CEP não Encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
    }
        
    function pesquisacep(valor) {

        //Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('rua').value="...";
                document.getElementById('bairro').value="...";
                document.getElementById('cidade').value="...";
                document.getElementById('uf').value="...";

                //Cria um elemento javascript.
                var script = document.createElement('script');

                //Sincroniza com o callback.
                script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

                //Insere script no documento e carrega o conteúdo.
                document.body.appendChild(script);

            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    };