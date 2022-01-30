//Fixando a data inicial;
let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();

//Condição para fixar a data na caixa de texto (date);

if (day <= 9) {
    day = `0${day}`
}
if (month <= 9) {
    month = `0${month}`
}
$('#data').val(`${year}-${month}-${day}`)

//Função para rodar a data do dia ao carregar a página;

window.onload = function () {
    $('#data').val(`${year}-${month}-${day}`);
    buscarData();
}

//Função para definir o click do botão;

$('#send').click(function (event) {
    event.preventDefault();
    buscarData();
});

//Definindo variáveis para a função buscarData();

const titulo = $('#titulo');
const texto = $('#texto');
const copyright = $('#copyright');
const imagem = $('#imagem');
const imagemErro = $('#imagemErro')
const video = $('#video');

//Função para fazer a requisição na api;

function buscarData() {
    var data = $('#data').val();

    $.ajax({
        url: `https://api.nasa.gov/planetary/apod?api_key=Oc02j8bgLTk2opaOxkDt6DtZk3haFIMPMTzRO8zh&date=${data}`,

        //Caso tenha sucesso ele ira executar com o parametro;
        success: function (parametro) {
            //Escreve os parametros na tela;
            $('#titulo').text(parametro.title);
            $('#texto').text(parametro.explanation);
            if (parametro.copyright !== undefined) {
                $('#copyright').text(`Image Credit & Copyright: ${parametro.copyright}`);
            } else {
                $('#copyright').text(`Copyright: Unknow`);
            }
            //Caso a pesquisa retorne uma imagem exibe a imagem e caso seja video ele exibe o vídeo;

            if (parametro.media_type == 'image') {
                $('#texto').css({
                    display: 'block'
                });
                $('#copyright').css({
                    display: 'block'
                });
                imagem.attr('src', parametro.url);
                $('#imagem').css({
                    display: 'block'
                });
                $('#video').css({
                    display: 'none'
                });
                $('#imagemErro').css({
                    display: 'none'
                })

            } else {
                $('#texto').css({
                    display: 'block'
                });
                $('#copyright').css({
                    display: 'block'
                });
                video.attr('src', parametro.url);
                $('#imagem').css({
                    display: 'none'
                });
                $('#video').css({
                    display: 'block'
                });
                $('#imagemErro').css({
                    display: 'none'
                })
            }
        },
        //Caso ocorra algum erro ele exibe essa função;
        error: function () {

            $('#titulo').text(`error : bad request... contact NASA!`);
            $('#texto').css({
                display: 'none'
            });
            $('#copyright').css({
                display: 'none'
            });
            $('#imagem').css({
                display: 'none'
            });
            $('#video').css({
                display: 'none'
            });
            $('#imagemErro').css({
                display: 'block'
            })
        }
    })
}