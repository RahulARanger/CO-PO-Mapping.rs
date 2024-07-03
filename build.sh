# this is the build script that would run past the installation script in vercel
source "$HOME/.cargo/env"

# install packages for worker-crate and builds target files
cargo build
# prepare crate
rustup target add wasm32-unknown-unknown
wasm-pack build --target wasm32-unknown-unknown

ls pkg

pnpm build
