export async function getNodes() {
  const response = await fetch('/data-files/nodes_edges.json')
  const data = await response.json()
  return data
}

export async function printNodes() {
  try {
    const rawData = await getNodes()
    return rawData
  } catch (error) {
    console.log(error);
  }
}
