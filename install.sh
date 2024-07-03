curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
rustup -V
. "$HOME/.cargo/env";
pnpm install;
npm install -g wasm-pack;