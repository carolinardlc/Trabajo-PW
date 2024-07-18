import './estiloSerieLista.css'

const ListaSerie = () => {
    return (
        <>
            <header>
            <h2>TIENDA</h2>
            </header>
            <section id= "medio1">
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
                <article class="SeriesTodo">
                    <h3 class="series">Series</h3>
                    <input id="Buscarserie" type="text" placeholder="Buscar por nombre, descripción o ID..." />

                    <article id="tabla">
                    <table>
                        <thead  >
                            <tr class="columna">
                                <th id="item1">ID</th>
                                <th id="item2">Nombre</th>   
                                <th id="item3">Descripción</th>
                                <th id="item4">Fecha de creación</th>
                                <th id="item5">Nro. Productos</th>
                                <th id="item6">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="columna">
                                <td>001</td>
                                <td>Nike Air Max 90 Blanco/Negro-Platino Puro</td>
                                <td>Colección Nike Air Max 90 para hombre FD9082-107</td>
                                <td>18/03/2023</td>
                                <td>10293</td>
                                <td><a href=''>Ver</a></td>
                            </tr>
                            <tr class="columna">
                                <td>002</td>
                                <td>Nike Dunk Low Retro Blanco/Concord-Rojo Universidad</td>
                                <td>Colección Nike Dunk línea "Be True To Your School" para hombres DV0833-103</td>
                                <td>25/05/2024</td>
                                <td>75493</td>
                                <td><a href=''>Ver</a></td>
                            </tr>
                            <tr class="columna">
                                <td>003</td>
                                <td>Nike Air Force 1 '07 Blanco/Negro-Blanco</td>
                                <td>Colección Nike Air Force 1 FQ4296-10</td>
                                <td>08/02/2020</td>
                                <td>23233</td>
                                <td><a href=''>Ver</a></td>
                            </tr>
                        </tbody>
                    </table>
                    </article>

                    <div class="button-container">
                        <button class="btn0"><b>&lt; Anterior</b></button>
                        <button class="btn">1</button>
                        <button class="btn">2</button>
                        <button class="btn">3</button>
                        <button class="btn">4</button>
                        <button class="btn">5</button>
                        <button class="btn">...</button>
                        <button class="btn">7</button>
                        <button class="btn0"><b>Siguiente &gt;</b></button>
                    </div>
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

export default ListaSerie;
