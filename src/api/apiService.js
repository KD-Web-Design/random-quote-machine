
export async function fetchData(endpoint) {
    try {
      
      const response = await fetch(endpoint);
  
      
      if (!response.ok) {
        throw new Error(`Erreur: ${response.status}`);
      }
  
      
      const data = await response.json();
      return data;
    } catch (error) {
      
      console.error('Une erreur est survenue lors de l\'appel API:', error);
      throw error;
    }
  }
  