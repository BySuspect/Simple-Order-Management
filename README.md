# Info

### DevArchitecture

###### Migration Management with DevArchitecture involves two types of environment variables:

```bash
$env:ASPNETCORE_ENVIRONMENT='Staging'
```

```bash
$env:ASPNETCORE_ENVIRONMENT='Production'
```

###### Migration via IDE

* If migration is to be performed from the IDE, for example, to staging:

* If the WebAPI project is not defined, right-click on the project and define it as the `Startup Project`.

* Open the `Package Manager Console` from `View` -> `Other Windows` menu in Visual Studio 2022.

* Select the Default Project as the `DataAccess` project, and run the commands below on this screen.
  

```bash
$env:ASPNETCORE_ENVIRONMENT='Staging'
```

```bash
Add-Migration InitialCreate -context MsDbContext -OutputDir Migrations/Ms
```

* `InitialCreate` is name of Migration you need change it every adding new migrations
```bash
Update-Database -context MsDbContext
```

### Admin account

* Username: `admin@adminmail.com`
* Password: `Q1w212*_*`
