<#
PowerShell helper to build and start the project's Docker Compose stack.
Usage:
  .\scripts\run.ps1        # builds and starts the stack
  .\scripts\run.ps1 -Detach # same as default, runs detached
#>
param(
  [switch]$Detach
)

function Check-Command($cmd) {
  $null -ne (Get-Command $cmd -ErrorAction SilentlyContinue)
}

if (-not (Check-Command docker)) {
  Write-Error "Docker CLI not found in PATH. Please install Docker Desktop and ensure 'docker' is available.";
  exit 1
}

Write-Host "Building and starting Docker Compose stack..." -ForegroundColor Cyan

# Build and start services
$upCmd = "docker compose up --build"
if ($Detach) { $upCmd += " -d" }

Write-Host "Running: $upCmd" -ForegroundColor Yellow
iex $upCmd

# Wait for backend health endpoint
$healthUrl = 'http://localhost:5500/health'
$maxChecks = 30
$waitSec = 2
$ok = $false

for ($i = 0; $i -lt $maxChecks; $i++) {
  try {
    $resp = Invoke-RestMethod -Uri $healthUrl -Method Get -TimeoutSec 2 -ErrorAction Stop
    if ($resp) {
      Write-Host "Backend health check succeeded at $healthUrl" -ForegroundColor Green
      $ok = $true
      break
    }
  } catch {
    Write-Host "Waiting for backend to become healthy... ($($i+1)/$maxChecks)" -NoNewline
    Start-Sleep -Seconds $waitSec
    Write-Host "`r`n" -NoNewline
  }
}

if (-not $ok) {
  Write-Warning "Backend did not report healthy after $($maxChecks * $waitSec) seconds. Check container logs with 'docker compose logs backend'.";
} else {
  Write-Host "All services started (or backend responded). Frontend available at http://localhost/ (port 80)." -ForegroundColor Cyan
}

Write-Host "To stop and remove containers: docker compose down" -ForegroundColor Yellow
