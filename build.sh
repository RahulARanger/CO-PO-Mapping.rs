# this is the build script that would run past the installation script in vercel
source "$HOME/.cargo/env"

# install packages for worker-crate and builds target files
cargo build
# prepare crate
pnpm build-crate

ls pkg

pnpm build
