export async function getNodesFile() {
  const response = await fetch('/data-files/nodes_edges.json')
  const data = await response.json()
  return data
}

export async function getMetadataFile() {
  const response = await fetch('/data-files/metadata.json')
  const data = await response.json()
  return data
}

export async function getNodes() {
  try {
    const rawData = await getNodesFile()
    return rawData
  } catch (error) {
    console.log(error);
  }
}

export async function getMetadata() {
  try {
    const rawData = await getMetadataFile()
    return rawData
  } catch (error) {
    console.log(error);
  }
}
