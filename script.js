// Dados dos animais
const animais = {
    "LEAO": { tamanho: 3, biomas: ["savana"] },
    "LEOPARDO": { tamanho: 2, biomas: ["savana"] },
    "CROCODILO": { tamanho: 3, biomas: ["rio"] },
    "MACACO": { tamanho: 1, biomas: ["savana", "floresta"] },
    "GAZELA": { tamanho: 2, biomas: ["savana"] },
    "HIPOPOTAMO": { tamanho: 4, biomas: ["savana", "rio"] }
  };
  
 //console.log(animais);


  // Recintos existentes
  const recintos = [
    { numero: 1, bioma: "savana", tamanho: 10, animais: { "MACACO": 3 } },
    { numero: 2, bioma: "floresta", tamanho: 5, animais: {} },
    { numero: 3, bioma: "savana e rio", tamanho: 7, animais: { "GAZELA": 1 } },
    { numero: 4, bioma: "rio", tamanho: 8, animais: {} },
    { numero: 5, bioma: "savana", tamanho: 9, animais: { "LEAO": 1 } },
   
  ];

  console.log(recintos);

    // Função para encontrar recintos viáveis
    function encontrarRecinto(animal, quantidade) {
        // 1. Verificar se o animal é válido
        if (!animais[animal]) {
          return "Animal inválido";
        }
      
        // 2. Verificar se a quantidade é válida
        if (quantidade <= 0 || isNaN(quantidade)) {
          return "Quantidade inválida";
        }

            // 3. Recuperar informações do animal
    const dadosAnimal = animais[animal];
    const biomasAdequados = dadosAnimal.biomas;
    const tamanhoAnimal = dadosAnimal.tamanho * quantidade;
  
    const recintosViaveis = [];


      // 4. Iterar pelos recintos
      recintos.forEach((recinto) => {
        const biomaRecinto = recinto.bioma;
        const tamanhoTotal = recinto.tamanho;
        const animaisNoRecinto = recinto.animais;
    
        // 5. Verificar se o bioma é compatível
        if (!biomasAdequados.some((bioma) => biomaRecinto.includes(bioma))) {
          return; // Recinto incompatível com o bioma do animal
        }

        
      // 6. Verificar regras de convivência
      const animaisPresentes = Object.keys(animaisNoRecinto);

         // Carnívoros só podem estar com sua própria espécie
         if (animal === "LEAO" || animal === "LEOPARDO" || animal === "CROCODILO") {
            if (animaisPresentes.length > 0 && !animaisNoRecinto[animal]) {
              return; // Já existem outras espécies no recinto
            }
          }

          
      // Hipopótamos só aceitam outras espécies em biomas de savana e rio
      if (animal === "HIPOPOTAMO" && biomaRecinto !== "savana e rio" && animaisPresentes.length > 0) {
        return; // Hipopótamos não toleram outras espécies fora da savana e rio
      }

      
      // 7. Calcular espaço ocupado pelos animais existentes
      let espacoOcupado = 0;
      animaisPresentes.forEach((especie) => {
        espacoOcupado += animais[especie].tamanho * animaisNoRecinto[especie];
      });

      
      // Adicionar espaço extra se houver mais de uma espécie
      if (animaisPresentes.length > 0 && !animaisNoRecinto[animal]) {
        espacoOcupado += 1; // 1 espaço extra por nova espécie
      }
       //Declarando a variavel
       const espacoLivre = tamanhoTotal - espacoOcupado;
  
       // 8. Verificar se há espaço suficiente para o novo lote de animais
       if (espacoLivre >= tamanhoAnimal) {
         recintosViaveis.push({
           numero: recinto.numero,
           espacoLivre: espacoLivre - tamanhoAnimal,
           espacoTotal: tamanhoTotal
         });
       }
     });

      
    // 9. Verificar se algum recinto foi encontrado
    if (recintosViaveis.length > 0) {
        // Ordenar por número do recinto
        recintosViaveis.sort((a, b) => a.numero - b.numero);
    
        // Retornar lista formatada de recintos viáveis
        return recintosViaveis.map(recinto => 
          `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivre} total: ${recinto.espacoTotal})`
        );
      } else {
        return "Não há recinto viável";
      }
    }
    
  
     
 
  // Exemplo de uso
  console.log(encontrarRecinto("HIPOPOTAMO", 5)); // Exemplo de chamada
//   console.log(encontrarRecinto("LEAO", 1));   // Exemplo de chamada
//   console.log(encontrarRecinto("MACACO", 4)); // Exemplo de chamada
  
