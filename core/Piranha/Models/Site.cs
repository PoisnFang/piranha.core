/*
 * Copyright (c) .NET Foundation and Contributors
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 *
 * https://github.com/piranhacms/piranha.core
 *
 */

using System;
using System.ComponentModel.DataAnnotations;
using Piranha.Extend.Fields;

namespace Piranha.Models
{
    [Serializable]
    public sealed class Site
    {
        /// <summary>
        /// Gets/sets the unique id.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Gets/sets the language id.
        /// </summary>
        public Guid LanguageId { get; set; }

        /// <summary>
        /// Gets/sets the optional site type id.
        /// </summary>
        [StringLength(64)]
        public string SiteTypeId { get; set; }

        /// <summary>
        /// Gets/sets the main title.
        /// </summary>
        [Required]
        [StringLength(128)]
	    public string Title { get; set; }

        /// <summary>
        /// Gets/sets the internal textual id.
        /// </summary>
        [StringLength(64)]
        public string InternalId { get; set; }

        /// <summary>
        /// Gets/sets the optional description.
        /// </summary>
        [StringLength(256)]
        public string Description { get; set; }

        /// <summary>
        /// Gets/sets the optional site logo.
        /// </summary>
        public ImageField Logo { get; set; } = new ImageField();

        /// <summary>
        /// Gets/sets the optional hostnames to bind this site for.
        /// </summary>
        [StringLength(256)]
        public string Hostnames { get; set; }

        /// <summary>
        /// Gets/sets if this is the default site.
        /// </summary>
        public bool IsDefault { get; set; }

        /// <summary>
        /// Gets/sets the optional culture for the site.
        /// </summary>
        [StringLength(6)]
        [Obsolete("Please refer to the culture of the selected language of the site", true)]
        public string Culture { get; set; }

        /// <summary>
        /// Gets/sets the global last modification date
        /// of the site's content.
        /// </summary>
        public DateTime? ContentLastModified { get; set; }

        /// <summary>
        /// Gets/sets the created date.
        /// </summary>
	    public DateTime Created { get; set; }

        /// <summary>
        /// Gets/sets the last modification date.
        /// </summary>
	    public DateTime LastModified { get; set; }
    }
}
