export const getCsvByUrl = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const csvData = await response.text();

    return csvData;
  } catch (error) {
    console.error('Fetching CSV failed:', error);
    throw error;
  }
};
