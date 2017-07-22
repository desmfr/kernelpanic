---
layout: post
title:  "Mon mediacenter de Arch à Z"
date:   2017-07-22 12:21:19 +0200
categories: linux
---
Pour se monter un mediacenter aujourd'hui, on a l'embarras du choix des solutions clé en main (aka je sais pas ce que je fais mais ça marche) avec des trucs comme open-elec sur Raspberry, Plex etc.

Mais justement si on veut comprendre un peu ce qui se passe et comment ça marche, je trouve ça plutôt cool de se l'installer soit même son mediacenter.

<h2>La base</h2>

Pour ce faire on partira sur la stack suivante:
* hardware : Un Raspberry Pi2 et un disque dur usb2 externe (gros stockage pour pas cher et pas de besoin de perfs)
* Distribution Linux : Archlinux ARMv7 (la version qui va bien pour le Pi2)
* Mediacenter : *Kodi 17*


<h2>Make it</h2>


<h3>1 On flash une carte micro SD</h3>

Pour préparer la carte micro SD (de préférences une classe 10, 8Go suffisent mais à on est large et à l'aise à partir de 16), on peut le faire en ligne de commande mais moi j'ai usé de [GParted](http://gparted.org/) (j'use beaucoup de GParted dans ma vie).

Il faut créer deux partitions, une première en FAT32 (oué oué en FAT32) de 512 Mo, et la deuxième en EXT4 (\o/) qui prend toute la place qui reste. On tag la première `boot` et la seconde `root` (si si ca simplifie la vie ensuite).

On se retrouve donc ainsi:

* /dev/mmcblk1p1 - FAT32 - boot - 512Mo
* /dev/mmcblk1p2 - EXT4 - root - le reste des Mo

Maintenant on va créer les points de montage `/mnt/boot` et `/mnt/root` (faudra passer en *root* à ce moment là)
{% highlight bash %}cd /mnt
mkdir boot root{% endhighlight %}

Puis on y monte les deux partitions dans le carte
{% highlight bash %}mount /dev/mmcblk1p1 boot
mount /dev/mmcblk1p2 root{% endhighlight %}

On récupère la [dernière version d'Archlinux ARMv7 disponible](http://os.archlinuxarm.org/os/ArchLinuxARM-rpi-2-latest.tar.gz) et on l'extrait dans le dossier `root`
{% highlight bash %}bsdtar -xpf ArchLinuxARM-rpi-2-latest.tar.gz -C root
sync{% endhighlight %}

Il faut bien penser au `sync` car les cartes micro SD sont taquines. Il faut d'ailleurs pas hésiter à répeter cette opération dès qu'on écrit dessus.

On déplace le contenur du dossier `./root/boot` dans `./boot`
{% highlight bash %}mv root/boot/* boot
sync{% endhighlight %}

Et voilà on est prêt à faire booter le Pi2 sur notre carte micro SD avec Archlinux dessus ;) Tout cette première étape est en fait détaillée [ici](https://archlinuxarm.org/platforms/armv7/broadcom/raspberry-pi-2) avec les lignes de commandes pour créer les partitions.

Mais avant de démonter nos deux partitions pour récupérer la carte, on peut profiter du moment pour apporter nos premières modifs au système :
* On size comme il faut la mémoire vidéo du Pi2 en lui allouant 512Mo (on peut faire avec moins aussi) en modifiant le fichier `./boot/config.txt` comme ceci : gpu_mem=512
* On peut également déjà mettre à jour le fichier `/etc/fstab` pour automatiser le montage de notre disque usb externe en rajoutant des lignes du style :
{% highlight bash %}# /dev/sdaX LABEL=Media
UUID=UUID-DE-LA-PARTITION /mon/chemin/de/montage ext4 rw,relatime,data=ordered 0 2{% endhighlight %}

On oublie pas le petit sync des familles et on peut maintenant démonter notre carte micro SD.
{% highlight bash %}sync && umount boot root{% endhighlight %}

<h3>2 on fait booter le Pi2 sur la carte micro SD</h3>

On insère donc la carte dans le Pi2 et on démarre dessus. On a un système Archlinux vierge, on peut s'y connecter avec les users par défaut *alarm* (mot de passe *alarm*) et *root* (mot de passe *root*).

Alors on s'y connecte, en *root* tant qu'on y est, et on se dépêche de changer le mot de passe!
{% highlight bash %}passwd{% endhighlight %}

Là c'est le moment on fait quelques bidouilles pour se mettre bien :
* on choisit notre hostname, pour moi c'est arch-pi2
{% highlight bash %}echo arch-pi2 > /etc/hostname{% endhighlight %}

* on cale le fuseau horaire
{% highlight bash %}#rm /etc/localtime avant si conflit
ln -s /usr/share/zoneinfo/Europe/Paris /etc/localtime{% endhighlight %}

* On va décommenter notre petite ligne *fr_FR.UTF-8 UTF-8* dans le fichier `/etc/locale.gen` puis on balance les locales et la keymap
{% highlight bash %}locale-gen
echo LANG="fr_FR.UTF-8" > /etc/locale.conf
echo KEYMAP=fr > /etc/vconsole.conf{% endhighlight %}

* On init NTP, parce que c'est comme ça (en vrai ca va servir ensuite quand on voudra partager nos films et notre musique sur notre réseau local)
{% highlight bash %}timedatectl set-ntp true{% endhighlight %}

(on peut retrouver tout ça plus en détail sur le [wiki Archlinux](https://wiki.archlinux.fr/Installation))

Là on peut rebooter pour bien checker que tout démarre sans erreur et que nos modifs sont bien prises en compte (un petit `sync` avant le reboot ça mange pas de pain)
{% highlight bash %}sync && sync && sync && reboot{% endhighlight %}

On se reconnecte en *root* avec notre nouveau mot de passe et on balance un mise à jour globale du système :
{% highlight bash %}pacman -Syu{% endhighlight %}



Déjà on va faire le ménage en supprimant le user par défaut *alarm* et en créant le notre :
{% highlight bash %}useradd -g users -G wheel -m moi
passwd moi
userdel alarm
rm -rf /home/alarm{% endhighlight %}

Puis on se fait plaisir en donnant à son user un shell qui roxx de la licorne (étape très facultative)
{% highlight bash %}pacman -Sy fish
chsh -s /usr/bin/fish moi{% endhighlight %}

<h3>3 Voilà le mediacenter!</h3>

Toujours connecté en *root*, on peut enfin installer Kodi, notre mediacenter (le deuxième paquet `libcec-rpi` sert à ce que la télécommande native de votre télé puisse piloter le mediacenter)
{% highlight bash %}pacman -Sy kodi-rbp libcec-rpi{% endhighlight %}

Là on se déconnecte de *root* pour se reconnecter avec son user, et on peut lancer `kodi`, le tour est joué! Il ne vous reste plus qu'à définir dedans vos sources de fichiers pour construire votre médiathèque.

<h3>4 Et si on partageait nos dossiers média à nos autres devices?</h3>

Easy, on va installer nfs!
{% highlight bash %}pacman -Sy nfs-utils{% endhighlight %}

De là on édite le fichier `/etc/exports` en ajoutant nos partages, avec des lignes dans ce genre :
{% highlight bash %}/mon/chemin/de/montage/local 192.168.1.1/24(rw,insecure,anonuid=1000,anongid=100,no_subtree_check){% endhighlight %}

On démarre maintenant le démon nfs et on l'active au boot
{% highlight bash %}systemctl enable nfs-server{% endhighlight %}

Si votre démon run déjà, vous pouvez charger votre nouvelle conf avec
{% highlight bash %}exportfs -rav{% endhighlight %}

Vos filesystems partagés sont désormais accesibles via vos autres devices clients nfs :) Notez que sur android il faut avoir rooté son matos pour pouvoir lire les partages nfs :/

La config nfs est assez obscure, vous trouverez des infos [ici](https://wiki.archlinux.fr/NFS).

<h3>5 Et après?</h3>
Kodi tourne sans installer `xorg-server` explicitement, mais n'éhsitez pas à le faire si vous voulez approfondir les bidouilles ([doc ici](https://wiki.archlinux.fr/Xorg)).


à bientôt :)
