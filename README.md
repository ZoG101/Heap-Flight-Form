# Fila em Heap

Fila em Heap é uma estrutura de dados que combina as propriedades de uma fila e de um heap. Ela permite a inserção de elementos com prioridade, onde os elementos com maior prioridade são processados antes dos demais ou vice-versa.

## Implementação

O intuito aqui é demonstrar a implementação de uma fila em heap com uma aplicação que simula o agendamento de voos em uma companhia aérea. A fila será usada para gerenciar os voos com base em suas prioridades.

## Prioridades

As prioridades dos voos serão definidas com bases em 4 critérios:

1. **Idade avançada**: Quem tiver mais de 60 anos tem prioridade;
2. **Gestantes**: Mulheres grávidas têm prioridade;
3. **Crianças**: Crianças com menos de 12 anos têm prioridade;
4. **Padrão**: Passageiros sem prioridade especial serão atendidos por último;

## Requisitos

- Página de cadastro de passageiros;
- Página de agendamento de voos;
- Página de visualização da fila dos voos agendados;

## Estrutura de Dados

A fila em heap será implementada utilizando uma lista, onde cada elemento é um objeto contendo as informações do voo e sua prioridade. A prioridade será calculada com base nos critérios mencionados. Utilizaremos composição para os objetos onde cada voo terá, além de suas informações básicas sobre o voo, pelo menos um passageiro associado e cada passageiro terá informações pessoais básicas e um objeto de endereço associado.

O heap será mínimo, ou seja, o elemento com menor prioridade será o primeiro a ser removido da fila. Isso se deve ao fato de que queremos demostrar o funcionamento da fila e portanto, para o heapSort, é mais conveniente tê-lo como mínimo. É claro que isso não deveria ser implementado em produção, pois o ideal é que o heap seja máximo, ou seja, o elemento com maior prioridade seja o primeiro a ser tratado e removido.

## Tecnologias

<div>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="30" alt="html5 logo" style="height: 30px" />
    <img width="12" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="30" alt="css3 logo" style="height: 30px" />
    <img width="12" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="30" alt="cplusplus logo" style="height: 30px" />
    <img width="12" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="30" alt="react logo" style="height: 30px" />
    <img width="12" />
</div>
