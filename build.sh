# this is the build script that would run past the installation script in vercel

# install packages for worker-crate and builds target files
cargo build

ls

# prepare crate
pnpm build-crate

ls pkg

pnpm build
