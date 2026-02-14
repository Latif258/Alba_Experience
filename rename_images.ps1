$root = "c:\Users\Latif\Documents\AlbaExperience\public\portfolio\weddings"

# Traditional
Write-Host "Renaming Traditional..."
Get-ChildItem "$root\traditional-engagement" -Filter "traditional (*).jpeg" | ForEach-Object {
    $newName = $_.Name -replace 'traditional \((\d+)\).jpeg','traditional-$1.jpeg'
    Rename-Item $_.FullName -NewName $newName
    Write-Host "Renamed $($_.Name) to $newName"
}

# Prewedding
Write-Host "Renaming Prewedding..."
Get-ChildItem "$root\prewedding" -Filter "prewedding (*).jpeg" | ForEach-Object {
    $newName = $_.Name -replace 'prewedding \((\d+)\).jpeg','prewedding-$1.jpeg'
    Rename-Item $_.FullName -NewName $newName
    Write-Host "Renamed $($_.Name) to $newName"
}

# Wedding
Write-Host "Renaming Wedding..."
Get-ChildItem "$root\wedding" -Filter "wedding (*).jpg" | ForEach-Object {
    $newName = $_.Name -replace 'wedding \((\d+)\).jpg','wedding-$1.jpg'
    Rename-Item $_.FullName -NewName $newName
    Write-Host "Renamed $($_.Name) to $newName"
}
