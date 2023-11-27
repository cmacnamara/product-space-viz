export async function getNodes() {
  const response = await fetch('/data-files/nodes_edges.json')
  const data = await response.json()
  return data
}

export async function getMetadata() {
  const response = await fetch('/data-files/metadata.json')
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

export async function printMetadata() {
  try {
    const rawData = await getMetadata()
    return rawData
  } catch (error) {
    console.log(error);
  }
}
