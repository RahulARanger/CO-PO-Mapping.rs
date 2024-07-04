# this is the installation script in vercel
# it ensures rust is installed along with our node packages

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source "$HOME/.cargo/env"

# c-make was required to install wasm-pack
yum install -y cmake

# wasm-pack is required to compile our rust to wasm
cargo install wasm-pack

pnpm install;
