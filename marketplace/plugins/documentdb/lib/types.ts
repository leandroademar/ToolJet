export type SourceOptions = {
  connection_type: string;
  database: string;
  host: string;
  port: string;
  username: string;
  password: string;
  ca_cert: string;
  sshHost: string;
  sshUser: string;
  sshPort: string;
  sshKey: string;
  connection_string: string;
};
export type QueryOptions = {
  operation: string;
  collection: string;
  document: string;
  options: string;
  filter: string;
  documents: string;
  update: string;
  field: string;
  replacement: string;
  operations: string;
  pipeline: string;
};
