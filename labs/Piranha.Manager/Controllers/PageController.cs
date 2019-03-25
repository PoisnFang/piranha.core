/*
 * Copyright (c) 2019 Håkan Edling
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 *
 * https://github.com/piranhacms/piranha.core
 *
 */

using System;
using Microsoft.AspNetCore.Mvc;

namespace Piranha.Manager.Controllers
{
    /// <summary>
    /// Mvc controller for page management.
    /// </summary>
    [Area("Manager")]
    [Route("manager")]
    public class PageController : Controller
    {
        /// <summary>
        /// Gets the list view.
        /// </summary>
        [Route("pages")]
        public IActionResult List()
        {
            return View();
        }

        [Route("page/{id:Guid}")]
        public IActionResult Edit(Guid id)
        {
            return View(id);
        }
    }
}