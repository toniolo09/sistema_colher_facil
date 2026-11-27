// Espelha os models e controllers do backend Laravel (backend/app).

export type TipoUsuario = 'consumidor' | 'admin' | 'produtor';

type Timestamps = {
  created_at: string;
  updated_at: string;
};

export type User = Timestamps & {
  id: number;
  nome: string;
  email: string;
  tipo_usuario: TipoUsuario;
  nome_propriedade: string | null;
  telefone: string;
  email_verified_at: string | null;
};

// Colunas decimal chegam como número no SQLite e como string no MySQL.
type Decimal = number | string;

export type Produto = Timestamps & {
  id: number;
  nome: string;
  descricao: string;
  preco: Decimal;
  imagem: string | null;
  tipo_de_producao_id: number;
  categoria_id: number;
  user_id: number;
};

export type StatusPedido = 'pendente' | 'confirmado' | 'enviado' | 'entregue' | 'cancelado';

export type ItemDoPedido = Produto & {
  pivot: Timestamps & {
    pedido_id: number;
    produto_id: number;
    quantidade: number;
    preco_unitario: Decimal;
  };
};

export type Pedido = Timestamps & {
  id: number;
  produtor_id: number;
  consumidor_id: number;
  status: StatusPedido;
  produtos: ItemDoPedido[];
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  access_token: string;
  token_type: 'Bearer';
  utilizador: User;
};

export type RegisterPayload = {
  nome: string;
  email: string;
  password: string;
  tipo_usuario: TipoUsuario;
  telefone: string;
  nome_propriedade?: string;
};
