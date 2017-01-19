#! /bin/bash

set -e
set -u

cfg=$1

make -j `nproc` -B -C test/execute/ CFGDIR=`pwd`/cfg/$cfg

for f in test/execute/*.result
do
	name=`basename $f ".result"`

	case `tail -n 1 $f` in
		PASS)
			echo $name PASSED
			;;
		FAIL)
			echo $name FAILED
			;;
		SKIP)
			echo $name SKIPPED
			;;
		*)
			echo $name UNKNOWN TEST RESULT
			;;
	esac
done
