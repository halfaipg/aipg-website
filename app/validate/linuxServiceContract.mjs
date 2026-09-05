export const VALIDATOR_RELEASE_TAG = "v0.1.0-preview.15";
export const SYSTEMD_HELPER_COMMIT =
  "778e9a1f2263094918998954c62678dba6b90334";
export const SYSTEMD_HELPER_SHA256 =
  "32adb391ab0591a55b3cbefce851fb0b9965685dabfc26706d6458e488b5defd";
export const SYSTEMD_HELPER_URL =
  `https://raw.githubusercontent.com/AIPowerGrid/grid-validator/${SYSTEMD_HELPER_COMMIT}/scripts/install-systemd.sh`;

export function linuxCohortCommands() {
  return {
    install: `curl -fsSLO https://github.com/AIPowerGrid/grid-validator/releases/download/${VALIDATOR_RELEASE_TAG}/install-validator.sh
gh attestation verify install-validator.sh --repo AIPowerGrid/grid-validator
bash install-validator.sh
cd ~/.aipg-validator
aipg-validator enroll
aipg-validator self-test
aipg-validator check --no-probe`,
    service: `curl -fsSLo install-systemd.sh \\
  ${SYSTEMD_HELPER_URL}
printf '%s  %s\\n' \\
  ${SYSTEMD_HELPER_SHA256} \\
  install-systemd.sh | sha256sum -c -
chmod 700 install-systemd.sh
sudo AIPG_VALIDATOR_EXEC="$HOME/.local/bin/aipg-validator" \\
  AIPG_VALIDATOR_WORKDIR="$HOME/.aipg-validator" \\
  ./install-systemd.sh --dry-run
sudo AIPG_VALIDATOR_EXEC="$HOME/.local/bin/aipg-validator" \\
  AIPG_VALIDATOR_WORKDIR="$HOME/.aipg-validator" \\
  ./install-systemd.sh`,
    verify: `sudo systemctl status aipg-validator --no-pager
sudo journalctl -u aipg-validator -f`,
  };
}
