#! /bin/bash

set -e
set -u

cfg=$1

make -j `nproc` -B -C test/execute/ CFGDIR=`pwd`/cfg/$cfg

failed=0
passed=0
skipped=0
unknown=0

for f in test/execute/*.result
do
	name=`basename $f ".result"`

	case `tail -n 1 $f` in
		PASS)
			echo $name PASSED
			passed=$(($passed+1))
			;;
		FAIL)
			echo $name FAILED
			failed=$(($failed+1))
			;;
		SKIP)
			echo $name SKIPPED
			skipped=$(($skipped+1))
			;;
		*)
			echo $name UNKNOWN TEST RESULT
			unknown=$(($unknown+1))
			;;
	esac
done

echo "summary:"
echo "$passed passed, $failed failed, $skipped skiped, $unknown unknown"

if test $failed -ne 0
then
	exit 1
fi
