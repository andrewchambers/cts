
RESULTS := $(patsubst %.c,%.result, $(wildcard *.c))

.PHONY: results

results: $(RESULTS)

%.result: %.c
	$(CFGDIR)/execute $< > $@ 2>&1
