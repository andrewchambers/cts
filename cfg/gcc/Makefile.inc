
%.result: %.c
	$(CFGDIR)/execute $< > $@ 2>&1
