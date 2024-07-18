import './estiloAgregarSerie.css'

const AgregarSerie = () => {
    return (
        <>
            <header>
            <h2>TIENDA</h2>
            </header>
            <section id= "medio2">
                <article class="Admin">
                    <h3 class="admi">Admin</h3>
                    <ul type="none">
                        <li>Dashboard</li>
                        <br/>
                        <li>Usuarios registrados</li>
                        <br/>
                        <li>Productos</li>
                        <br/>
                        <li>Órdenes</li>
                        <br/>
                        <li>Series</li>
                    </ul>
                </article>
                <article class="AgregarTodo">
                    <h3 class="Agregar">Agregar Serie</h3>
                    <article class="AgregarDos">

                        <div class="Imagen_Agregar">
                        <input id="Cuadro_Imagen" type="" />
                        <button id="Bt_agregar">Agregar Imagen</button>
                        </div>

                        <div>
                        <h3 class="titulotercio">Nombre</h3>
                        <input id="NombreSerie" type="text" />
                        <h3 class="titulotercio">Descipción</h3>
                        <input id="DescripcionSerie" type="text" />
                        
                    <div id="titulosimbolo">
                    <h3 class="titulotercio2">Productos en la serie</h3>   
                    <button id="mas">+</button>
                    </div>
                    <div class="tabla">
                    <table> 
                        <thead>
                            <tr class="columna">
                                <th class="item1">ID</th>
                                <th class="item2">Descripción</th>   
                                <th class="item3">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="columna">
                                <td>001</td>
                                <td>Colección Nike Air Max 90 para hombre FD9082-107</td>
                                <td><a href=''>Remover</a></td>
                            </tr>
                            <tr class="columna">
                                <td>002</td>
                                <td>Colección Nike Dunk línea "Be True To Your School" para hombres DV0833-103</td>
                                <td><a href=''>Remover</a></td>
                            </tr>
                            <tr class="columna">
                                <td>003</td>
                                <td>Colección Nike Air Force 1 FQ4296-10</td>
                                <td><a href=''>Remover</a></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div class="espacioguardar">
                    <button id="guardar" >Guardar</button>
                    </div>
                    </div>
                    </article>
                </article>
                  
           </section>
            
            
            
            
            
            
            <footer>
                <article class="pie">
                    <div class="footer1">
                        <h1 class="tienda">LA TIENDITA DE DON PEPE</h1>
                        <p>@2010-2020</p>
                        <p>Privacy-Terms</p>
                    </div>
                    <div class="footer2">
                        <h3 class="til">Cuenta</h3>
                            <ul class="wo" type="none">
                                <li class="we">Login</li>
                               
                                <li class="we">Registro</li>
                               
                                <li class="we">Carrito</li>
                            </ul>
                    </div>
                    <div class="footer3">
                        <h3 class="til">Productos</h3>
                            <ul class="wo" type="none">
                                <li class="we">Más vendidos</li>
  
                                <li class="we">Nuevos</li>
                         
                                <li class="we">Ofertas</li>
                            </ul>
                    </div>
                    <div class="footer4">
                        <h3 class="til">Ayuda</h3>
                            <ul class="wo" type="none">
                                <li class="we">Acerca de nosotros</li>
                           
                                <li class="we">Política de envío</li>
                                
                                <li class="we">FAQ</li>
                            </ul>
                    </div>
                    <div class="footer5">
                        <img src="src\assets\logosredes.png" class="logos"/>
                    </div>

                </article>
            </footer>
        </>
    )
}

export default AgregarSerie;
