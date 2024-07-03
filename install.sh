curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source "$HOME/.cargo/env"
# checking available targets
rustc --print target-list
pnpm install;
npm install -g wasm-pack;
