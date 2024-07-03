# this is the build script that would run past the installation script in vercel
source "$HOME/.cargo/env"

# install packages for worker-crate and builds target files
cargo build

ls

# prepare crate
rustup target add wasm32-unknown-unknown
rustup target add web
pnpm build-crate

ls pkg

pnpm build
