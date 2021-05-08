# Disable built-in rules
.SUFFIXES:

# set the default target to install
.DEFAULT_GOAL:=install

# env variables needed for installation
WEB_URL_ROOT?=/
WEB_INSTALL_ROOT?=/var/www/html/
ERMRESTJS_REL_PATH?=ermrestjs/
CHAISE_REL_PATH2=chaise2/
OSD_VIEWER_REL_PATH?=openseadragon-viewer/

CHAISEDIR:=$(WEB_INSTALL_ROOT)$(CHAISE_REL_PATH2)
CHAISE_BASE_PATH:=$(WEB_URL_ROOT)$(CHAISE_REL_PATH2)

DIST=dist

.PHONY: install
install: $(DIST) dont_install_in_root
	$(info - deploying the package)
	ng build recordset --base-href=$(CHAISE_BASE_PATH)recordset/
	# ng build record --base-href=$(CHAISE_BASE_PATH)record/
	rsync -avz $(DIST)/ $(CHAISEDIR)

dont_install_in_root:
	@echo "$(CHAISEDIR)" | egrep -vq "^/$$|.*:/$$"
