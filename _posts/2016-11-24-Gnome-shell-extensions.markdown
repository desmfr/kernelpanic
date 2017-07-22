---
layout: post
title:  "Gnome-shell extensions : ma séléction"
date:   2016-11-24 20:21:19 +0200
categories: linux
---
<h2>Gnome-shell</h2>
[**Gnome-shell**](https://wiki.gnome.org/Projects/GnomeShell) est un environnement de bureau pour Linux, très ergonomique, léger, customisable, et beau... et aujourd'hui carrément stable, en plus. Je l'utilise pour ma part sous [Archlinux](https://archlinux.fr/).

[**Gnome-shell**](https://wiki.gnome.org/Projects/GnomeShell) a la particularité de proposer un [catalogue d'extensions](https://extensions.gnome.org/) consultables et installables directement depuis votre navigateur (utilisateur de Chrome/Chromium, le plugin du site n'est pas supporté, pour aller au plus simple : utiliser Firefox pour vous y rendre, ou sinon aller télécharger les archives sur GitHub et installer les à coups de clics avec *gnome-tweeak-tool*).

On y trouve un peu de tout, beaucoup de gadget sans grand intérêt, mais aussi de petites pépites et c'est quelques unes de celle ci que je vais vous présenter (la qualification de pépite relevant bien évidemment de mon entière subjectivité).

<h2>Les extensions qui vont bien</h2>

J'ai donc présélectionné quatre d'entre elles, en esquivant volontairement les incontournables (*Docker Status*, *Proxy switcher*, *Dash to dock*, *Activities configurator*...).

<h3>Drop down terminal</h3>
Avoir un shell à porter de main pour lancer une commande en speed, un `yaourt -Syua`, un `systemctl status tor` ou que sais-je... Pratique non?

![Drop down terminal](http://pix.blizzart.net/image/1477331453/original.jpg)

Accessible en une touche (configurable), *Drop down terminal* est là pour ça. Aussitôt pressée (la touche) qu'un terminal descend du ciel, enfin de votre barre des tâches, et s'offre à vous.

[Sur GitHub](https://github.com/zzrough/gs-extensions-drop-down-terminal)

<h3>Windows blur effect</h3>

Si comme moi vous errez sur votre poste de travail avec de multiples applications ouvertes, rarement en plein écran, vos yeux sauront dire merci à cette extension.

![Windows blur effect](http://pix.blizzart.net/image/1477331709/original.jpg)

*Windows blur effect* a pour particularité de flouter et d'assombrir (à votre guise via les paramètres depuis *gnowe-tweak-tool* bien sûr) les fenêtres en arrière plan. Très reposant, et assez sexy.

[Sur GitHub](https://github.com/lviggiani/gnome-shell-extension-wbe)

<h3>Services systemd</h3>

Cette extension est moins tape à l'oeil, mais très pratique pour relancer ou stopper des services en un clic.

![Services systemd](http://pix.blizzart.net/image/1477332125/original.jpg)

On accède directement via une icône placé dans la barre des tâches à une liste de services à définir nous même via les paramètres. Bien entendu un mot de passe vous sera demander si vous n'êtes pas connecté en root sur votre interface graphique.

[Sur GitHub](https://github.com/petres/gnome-shell-extension-services-systemd)

<h3>Archlinux update indicator</h3>

Une extension exclusive à [Archlinux](https://archlinux.fr/), un indicateur des mises à jour disponibles (comme son nom l'indique oui) permettant un coup d’œil rapide à l'état de son système.

![Archlinux update indicator](http://pix.blizzart.net/image/1477332314/original.jpg)

On peut paramétrer le gestionnaire de paquets utilisé et les commandes induites.

[Sur GitHub](https://github.com/RaphaelRochet/arch-update)
