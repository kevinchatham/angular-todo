Clear-Host

$currentLocation = Get-Location

Set-Location $PSScriptRoot/..

docker build -t angular-todo .

docker run -p 80:80 angular-todo

Set-Location $currentLocation