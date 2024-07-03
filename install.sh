curl https://sh.rustup.rs -sSf | sh -s -- -y;
. "$HOME/.cargo/env";
pnpm install;
npm install -g wasm-pack;