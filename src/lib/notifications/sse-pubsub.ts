type Client = {
  id: string;
  send: (data: string) => void;
};

const clients = new Map<string, Client>();

export function addClient(id: string, send: (data: string) => void) {
  clients.set(id, { id, send });
}

export function removeClient(id: string) {
  clients.delete(id);
}

export function broadcast(data: any) {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  console.log("Broadcasting to clients:", clients.size);
  for (const client of clients.values()) {
    console.log(`Sending to client ${client.id}`);
    client.send(payload);
  }
} 

export function getClientCount(): number {
  return clients.size;
}